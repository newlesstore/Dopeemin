import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getAllData(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}