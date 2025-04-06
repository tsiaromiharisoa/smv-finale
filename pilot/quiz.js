
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/getQuiz', async (req, res) => {
  try {
    const response = await fetch('https://api-test-liart-alpha.vercel.app/quiz');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' });
  }
});

module.exports = router;
