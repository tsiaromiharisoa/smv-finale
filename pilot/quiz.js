
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

function decodeHtmlEntities(text) {
  const entities = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>'
  };
  return text.replace(/&quot;|&amp;|&lt;|&gt;/g, match => entities[match]);
}

async function translateText(text) {
  try {
    const decodedText = decodeHtmlEntities(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(decodedText)}&langpair=en|fr`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.status === 429) {
      console.log('Limite de traduction atteinte, retour du texte original');
      return decodedText;
    }
    
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Erreur de traduction:', error);
    return text;
  }
}

router.get('/getQuiz', async (req, res) => {
  try {
    const response = await fetch('https://api-test-liart-alpha.vercel.app/quiz');
    const data = await response.json();
    
    if (!data.response) {
      throw new Error('Pas de question reçue');
    }

    // Translate the decoded response
    const translatedResponse = await translateText(data.response);
    
    res.json({
      original: {
        response: decodeHtmlEntities(data.response)
      },
      translated: {
        response: translatedResponse
      }
    });
  } catch (error) {
    console.error('Erreur quiz:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' });
  }
});

module.exports = router;
