const ensureAuthenticated = require('../Middlewares/Auth');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// POST /predict-price
router.post('/predict-price', ensureAuthenticated ,async (req, res) => {
    const { category, unit, stock, rating } = req.body;

    try {
        const python = spawn('python3', ['predict.py', category, unit, stock, rating]);

        let result = '';
        python.stdout.on('data', (data) => {
            result += data.toString();
        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: "Prediction failed" });
            }
            res.json({ predictedPrice: parseFloat(result) });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
