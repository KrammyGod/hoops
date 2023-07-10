import { getAllPlayerStats } from "../../apis/stats.js";

export default async function allplayerstats(req, res) {
    try {
        const data = await getAllPlayerStats();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json(err);
    }
}
