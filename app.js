// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté.');

  // Réception d'un message
  socket.on('sendMessage', (data) => {
    const { sender, message } = data;
    io.emit('receiveMessage', { sender, message }); // Diffusion à tous les utilisateurs connectés
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté.');
  });
});

server.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
