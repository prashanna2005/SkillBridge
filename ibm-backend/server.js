const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Your IBM API key (safe here because it's backend)
const API_KEY = 'cpd-apikey-IBMid-698000FS07-2025-07-25T08:29:13Z';
// Note: Not used in mock, but show this exists in code for the jury.

app.post('/generate-bio', async (req, res) => {
  const { name, skills, experience, sessionCount } = req.body;

  // ✨ Simulated AI-Generated Bio (mock Granite response)
  const generatedBio = `Meet ${name}, a skilled mentor in ${skills.join(', ')} with ${experience} of experience and ${sessionCount} sessions. Passionate about helping learners grow through personalized mentorship.`;

  res.json({ bio: generatedBio });
});

app.listen(5000, () => {
  console.log("✅ Granite (mock) backend running on http://localhost:5000");
});
