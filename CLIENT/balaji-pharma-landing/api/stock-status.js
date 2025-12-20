import stockData from './stock-data.json';
import { cors } from './_utils.js';

export default function handler(req, res) {
    cors(res);
    // Cache for 5 minutes (300 seconds) - frequent updates allowed
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.status(200).json(stockData);
}
