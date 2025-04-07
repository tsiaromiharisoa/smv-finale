const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const gemini = require('./pilot/gemini');
const horoscopeRouter = require('./pilot/horoscope');
const tempmailRouter = require('./pilot/tempmail');
const quizRouter = require('./pilot/quiz');
const ohabolanaRouter = require('./pilot/ohabolana');

app.use('/api/horoscope', horoscopeRouter);
app.use('/api/tempmail', tempmailRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/ohabolana', ohabolanaRouter);
const handleChat = gemini.handleChat;

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', upload.array('files'), async (req, res) => {
  try {
    const message = req.body.message || '';
    const files = req.files || [];

    const response = await handleChat(message, files);
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/cours', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours/cours.html'));
});

app.get('/cours/serieA', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours/serieA/Cours_serie_A.html'));
});

app.get('/cours/serieA/malagasy', (req, res) => {

app.get('/cours/malagasy5eme', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours', 'malagasy5eme', 'malagasy5eme.html'));
});


  res.sendFile(path.join(__dirname, 'public', 'cours/serieA/cours_Malagasy_SerieA.html'));
});

app.get('/cours/malagasy6eme', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours', 'malagasy6eme', 'malagasy6eme.html'));
});

app.get('/cours/malagasy3eme', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours', 'malagasy3eme', 'malagasy3eme.html'));
});

app.get('/cours/malagasy4eme', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours', 'malagasy4eme', 'malagasy4eme.html'));
});

app.get('/cours/malagasy5eme', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cours', 'malagasy5eme', 'malagasy5eme.html'));
});

app.get('/sujet', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sujet.html'));
});

app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

app.get('/fichierPdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fichierPdf.html'));
});

app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

app.get('/autres', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/autres.html'));
});

app.get('/horoscope', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/horoscope.html'));
});

app.get('/autres/tempmail', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/tempmail.html'));
});

app.get('/autres/tempmail/generator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/tempmail/generator.html'));
});

app.get('/autres/tempmail/message', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/tempmail/message.html'));
});

app.get('/autres/Kabary/kabary.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/Kabary/kabary.html'));
});

app.get('/autres/ohabolana/ohabolana.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/ohabolana/ohabolana.html'));
});

app.get('/autres/kabary/ALA_SARONA/ala_sarona.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/kabary/ALA_SARONA/ala_sarona.html'));
});

app.get('/horoscope/dynamique.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'autres/horoscope/dynamique.html'));
});

app.get('/sujetAmpinga', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sujetAmpinga.html'));
});

app.post('/chat/reset', (req, res) => {
  try {
    // Réinitialiser la conversation
    res.json({ success: true });
  } catch (error) {
    console.error('Error resetting chat:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
});

app.get('/physiqueTA', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'physiqueTA.html'));
});

app.get('/pdfPCTA', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pdfPCTA.html'));
});



// Servir les fichiers PDF
app.use('/Attachement', express.static('Attachement'));

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});