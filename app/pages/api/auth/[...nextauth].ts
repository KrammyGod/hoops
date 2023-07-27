/**
 * Important: MUST be ts file otherwise CredentialsProvider is not a function
 * (1 hour of debugging)
 */
import { query } from '@modules/pool';
import { NextAuthOptions, User, Session, TokenSet } from 'next-auth';
import NextAuth from 'next-auth';
import * as type from '@/types/SessionDataTypes';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions : NextAuthOptions = {
    // Our custom provider
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Performing the query without using users.js as dependency
                const res = await query(`
                    SELECT uid, email, uName, uRole FROM HUser
                    WHERE email = $1 and hash = $2;
                `, [credentials?.email, credentials?.password]).then(ret => ret.rows[0]);
                return res;
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user } : { token: TokenSet, user: User }) {
            const customUser = user as type.DatabaseUser;
            const customToken = token as type.CustomToken;
            // Sets token to pass into session
            if (customUser) {
                customToken.id = customUser.uid;
                customToken.role = customUser.urole;
                customToken.name = customUser.uname;
                customToken.email = customUser.email;
            }
            return customToken;
        },
        async session({ session, token } : { session: Session, token: TokenSet }) {
            const customSession = session as type.CustomSession;
            const customToken = token as type.CustomToken;
            customSession.error = false;
            // Check if the session is still valid
            const user = await query(
                `SELECT uid, email, uName, uRole FROM HUser
                    WHERE uid = $1 AND email = $2 AND uName = $3 AND uRole = $4`, 
                [customToken.id, customToken.email, customToken.name, customToken.role]
            ).then(res => res.rows[0]) as type.DatabaseUser;
            // Invalid session now, user was changed
            // Mark as force sign out for frontend.
            if (!user) {
                customSession.error = true;
                return customSession;
            }
            // Sets session to pass into frontend
            // This is all frontend has access to.
            if (customSession?.user) {
                customSession.user.id = customToken.id;
                customSession.user.role = customToken.role;
                customSession.user.name = customToken.name;
                customSession.user.email = customToken.email;
            }
            return customSession;
        }
    }
}

export default NextAuth(authOptions);
