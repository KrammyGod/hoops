import { getAllTeamStats } from '@apis/stats.js';

export default async function allteamstats(req, res) {
    try {
        let page = (req.query.page ?? 1) - 1;
        page = (page < 0) ? 1 : page;
        const data = await getAllTeamStats(page);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
