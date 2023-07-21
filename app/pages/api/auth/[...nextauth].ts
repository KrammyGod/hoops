/**
 * Important: MUST be ts file otherwise CredentialsProvider is not a function
 * (1 hour of debugging)
 */
import { login } from '../../../apis/users';
import NextAuth, { User, Session, TokenSet } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as type from '@/types/SessionDataTypes';

export const authOptions : NextAuthOptions = {
    // Our custom provider
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await login(credentials?.email, credentials?.password);
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
        // eslint-disable-next-line
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
