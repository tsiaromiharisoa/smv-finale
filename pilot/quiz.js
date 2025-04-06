
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

async function translateText(text) {
  // Split text into chunks of 500 characters
  const chunks = text.match(/.{1,500}/g) || [];
  let translatedText = '';
  
  for (const chunk of chunks) {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|fr`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.status === 429) {
        // En cas d'erreur 429, on retourne le texte original
        return text;
      }
      
      translatedText += data.responseData.translatedText;
      // Attendre 3 secondes entre chaque requête
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Erreur de traduction:', error);
      // En cas d'erreur, on retourne le texte original
      return text;
    }
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
