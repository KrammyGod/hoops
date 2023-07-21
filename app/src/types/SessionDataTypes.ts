import { User, Session, TokenSet } from 'next-auth';

/** Interface for what we get from the raw database */
export interface DatabaseUser extends User {
    uid: number;
    urole: string;
    uname: string;
    email: string;
};

/** Custom JWT token storage */
export interface CustomToken extends TokenSet {
    id: number;
    role: string;
    name: string;
    email: string;
};

export interface CustomUser {
    id: number;
    role: string;
    name: string;
    email: string;
};

/** Interface for a single session */
export interface CustomSession extends Session {
    user: CustomUser;
};
