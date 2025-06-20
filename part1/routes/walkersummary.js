var express = require('express');
var router = express.Router();
var db = require('../db');

// Get walkers summary
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT u.username AS walker_username, 
        COUNT(DISTINCT rate.rating_id) AS total_ratings,
        ROUND(AVG(rate.rating), 1) AS average_rating,
        COUNT(DISTINCT CASE 
        WHEN req.status = 'completed' AND app.status = 'accepted' THEN req.request_id 
        ELSE NULL 
        END) AS completed_walks
        FROM Users u
        LEFT JOIN WalkApplications app ON app.walker_id = u.user_id
        LEFT JOIN WalkRequests req ON req.request_id = app.request_id
        LEFT JOIN WalkRatings rate ON rate.walker_id = u.user_id
        WHERE u.role = 'walker'
        GROUP BY u.username
    `);
        res.json(rows);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;