import { getAllPlayerStats } from "../../apis/stats.js";

export default async function allplayerstats(req, res) {
    const stats = await getAllPlayerStats();
    res.send(stats);
};