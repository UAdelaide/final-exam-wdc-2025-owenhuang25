var express = require('express');
var router = express.Router();
var db = require('../db');

// Get open requests
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT req.request_id, d.name, req.requested_time, req.duration_minutes, req.location, u.username 
        FROM WalkRequests req
        JOIN Dogs d ON req.dog_id = d.dog_id
        JOIN Users u ON d.owner_id = u.user_id
        WHERE req.status = 'open'
    `);
        res.json(rows);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;