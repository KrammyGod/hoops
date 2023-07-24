import { getSession } from 'next-auth/react';
/** 
 * This file exports a function that will
 * perform a validation before calling the respective handler.
 * Requires a function that takes 3 parameters:
 * @req - the request object
 * @res - the response object
 * @session - the session object
 * 
 * Example of calling (inside pages/api/...):
 * import protect from '@apis/validate_api';
 * export default protect(handler);
 */
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
