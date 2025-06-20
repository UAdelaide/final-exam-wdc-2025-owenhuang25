var express = require('express');
var router = express.Router();
var db = require('../db');

// Get dogs
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT d.name AS dog_name, d.size, u.username AS owner_username 
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
    `);
        res.json(rows);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;