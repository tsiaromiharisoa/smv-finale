
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/recherche', async (req, res) => {
  try {
    const { terme } = req.query;
    const response = await fetch(`https://test-api-milay-vercel.vercel.app/api/ohab/recherche?ohabolana=${terme}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

module.exports = router;
