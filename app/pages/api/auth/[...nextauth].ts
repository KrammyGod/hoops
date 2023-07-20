/**
 * Important: MUST be ts file otherwise CredentialsProvider is not a function
 * (1 hour of debugging)
 */
import { login } from '../../../apis/users';
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        async jwt({ token, user } : { token: any, user: any }) {
            // Sets token to pass into session
            if (user) {
                token.id = user.uid;
                token.role = user.urole;
                token.name = user.uname;
            }
            return token;
        },
        async session({ session, token } : { session: any, token: any }) {
            // Sets session to pass into frontend
            // This is all frontend has access to.
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.name = token.name;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions);
