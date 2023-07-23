import { getSession } from 'next-auth/react';
/** Docs go here, will be updated on monday */
export default (handler) => {
    return async (req, res) => {
        // This is a little hacky, but basically
        // getSession doesn't like it when you have a body
        // We tell getSession we don't have body,
        // and then set it back so that the API can use it.
        const body = req.body;
        req.body = undefined;
        const session = await getSession({ req });
        req.body = body;
        if (session && new Date() > new Date(session.expires)) {
            return res.status(440).json({ messages: 'session expired' });
        }
        return handler(req, res, session);
    }
};
