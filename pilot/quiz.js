
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

async function translateText(text) {
  // Split text into chunks of 500 characters
  const chunks = text.match(/.{1,500}/g) || [];
  let translatedText = '';
  
  for (const chunk of chunks) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|fr`;
    const response = await fetch(url);
    const data = await response.json();
    translatedText += data.responseData.translatedText;
    // Wait 1 second between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return translatedText;
}

router.get('/getQuiz', async (req, res) => {
  try {
    const response = await fetch('https://api-test-liart-alpha.vercel.app/quiz');
    const data = await response.json();
    
    // Translate the response
    const translatedResponse = await translateText(data.response);
    
    res.json({
      original: data,
      translated: {
        response: translatedResponse
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' });
  }
});

module.exports = router;
