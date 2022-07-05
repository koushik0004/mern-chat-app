const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const app = express();
const connectDB = require('./config/db');
const { chats } = require('./data/data');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 6001;

app.get('/', (_, res) => {
  res.send(`API is running!!`);
});

app.get('/api/chats', (_, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const chatData = chats.find((item) => item._id === req.params.id);
  res.send(chatData);
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listen to the port: ${PORT}`.yellow.bold);
});
