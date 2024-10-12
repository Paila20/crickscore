const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const scoreRoutes = require('./routes/scoreRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize express app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/scores', scoreRoutes);

// WebSocket connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('scoreUpdate', (data) => {
        io.emit('scoreUpdated', data); // Emit updated score to all connected users
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const socketio = require("socket.io");
// const http = require("http");

// const app = express();
// const server = http.createServer(app)

// app.get("/", function(req,res){
//     res.send("Hello World");
// })

// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000");
// })