const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Omkar@2001',
  database: 'chatbot',
  port: '3306'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to generate bot responses
function generateResponse(message) {
  const userMessage = message.toLowerCase();

  if (userMessage.includes('hello')) {
    return "Hi there! How can I assist you today?";
  } else if (userMessage.includes('how are you')) {
    return "I'm just a bot, but thanks for asking!";
  } else {
    return "I'm sorry, I didn't understand that.";
  }
}


app.post('/api/messages', (req, res) => {
  const { sender, content } = req.body;
  const botResponse = generateResponse(content);

  const insertUserQuery = `INSERT INTO messages (sender, content) VALUES (?, ?)`;
  db.query(insertUserQuery, [sender, content], (err, result) => {
    if (err) {
      console.error('Error inserting user message:', err);
      res.status(500).json({ error: 'Error inserting message' });
      return;
    }
  });


  const insertBotQuery = `INSERT INTO messages (sender, content) VALUES (?, ?)`;
  db.query(insertBotQuery, ['Bot', botResponse], (err, result) => {
    if (err) {
      console.error('Error inserting bot response:', err);
      res.status(500).json({ error: 'Error inserting message' });
      return;
    }
  });

  res.status(201).json({ message: 'Message sent successfully' });
});

app.get('/api/messages', (req, res) => {
  const query = `SELECT * FROM messages ORDER BY timestamp DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving messages:', err);
      res.status(500).json({ error: 'Error retrieving messages' });
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
