import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { CustomSession } from '@/types/SessionDataTypes';
/** 
 * This file exports a wrapper that will pass session information
 * into the handler you provide.
 * @param {(
 *      req : NextApiRequest,
 *      res : NextApiResponse,
 *      session : CustomSession | null
 *  ) => Promise<void>} handler
 * @return {(req : NextApiRequest, res : NextApiResponse) => Promise<void>}
 * Example of calling (inside pages/api/...):
 * ```
 * import { handler } from '@apis/api';
 * import protect from '@apis/protect';
 * export default protect(handler);
 * ```
 */
export default function protect(handler) {
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
