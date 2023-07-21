import { getSession } from 'next-auth/react';
/** Docs go here, will be updated on monday */
export default (handler) => {
    return async (req, res) => {
        const session = await getSession({ req });
        if (session && new Date() > new Date(session.expires)) {
            return res.status(401).json({ messages: 'session expired' });
        }
        return handler(req, res, session);
    }
};
