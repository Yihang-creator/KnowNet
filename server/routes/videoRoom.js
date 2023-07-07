const express = require('express');
const { Server } = require('socket.io');
const router = express.Router();

let rooms = {};
let io;

const attachSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        path: "/socket/videoRoom"
    });

    io.on('connection', (socket) => {
        console.log('A user connected'); // Log: A user connected
    
        socket.on('create-room', (room) => {
            console.log('Creating a new room'); // Log: Creating a new room
            const id = Date.now().toString();
            rooms[id] = {roomId: id, ...room};
            socket.join(id);
            socket.emit('room-created', id);
            console.log(`Room ${id} created and user joined`); // Log: Room [id] created and user joined
        });
    
        socket.on('join-room', (roomId) => {
            console.log(`User joining room ${roomId}`); // Log: User joining room [roomId]
    
            if (rooms[roomId]) {
                socket.join(roomId);
                socket.emit('room-state', rooms[roomId]);
                console.log(`User joined room ${roomId}`); // Log: User joined room [roomId]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('toggle-play', (roomId, state) => {
            console.log(`Toggle play in room ${roomId}: ${state}`); // Log: Toggle play in room [roomId]: [state]
    
            if (rooms[roomId]) {
                rooms[roomId].playing = state;
                socket.to(roomId).emit('play-toggled', state);
                console.log(`Play state toggled in room ${roomId}: ${state}`); // Log: Play state toggled in room [roomId]: [state]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('set-url', (roomId, url) => {
            console.log(`Set URL in room ${roomId}: ${url}`); // Log: Set URL in room [roomId]: [url]
    
            if (rooms[roomId]) {
                rooms[roomId].url = url;
                socket.to(roomId).emit('url-set', url);
                socket.emit('url-set', url);
                console.log(`URL set in room ${roomId}: ${url}`); // Log: URL set in room [roomId]: [url]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('set-seek', (roomId, duration) => {
            console.log(`Set seek in room ${roomId}: ${duration}`); // Log: Set seek in room [roomId]: [duration]
    
            if (rooms[roomId]) {
                rooms[roomId].duration = duration;
                socket.to(roomId).emit('seek-set', duration);
                console.log(`Seek set in room ${roomId}: ${duration}`); // Log: Seek set in room [roomId]: [duration]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('add-chat', (roomId, message) => {
            console.log(`Add chat in room ${roomId}: ${message}`); // Log: Add chat in room [roomId]: [message]
    
            if (rooms[roomId]) {
                rooms[roomId].chats = rooms[roomId].chats || [];
                rooms[roomId].chats.push(message);
                socket.to(roomId).emit('chat-added', message);
                console.log(`Chat added in room ${roomId}: ${message}`); // Log: Chat added in room [roomId]: [message]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('add-video', (roomId, video) => {
            console.log(`Add video in room ${roomId}: ${video}`); // Log: Add video in room [roomId]: [video]
    
            if (rooms[roomId]) {
                rooms[roomId].videos = rooms[roomId].videos || [];
                rooms[roomId].videos.push(video);
                socket.to(roomId).emit('update-queue', rooms[roomId].videos);
                socket.emit('update-queue', rooms[roomId].videos);
                console.log(`Video added in room ${roomId}: ${video}`); // Log: Video added in room [roomId]: [video]
            } else {
                socket.emit('error', 'The room does not exist');
                console.log(`Error: Room ${roomId} does not exist`); // Log: Error: Room [roomId] does not exist
            }
        });
    
        socket.on('disconnect', () => {
            console.log('A user disconnected'); // Log: A user disconnected
        });
    });
}

module.exports = {
    attachSocketServer: attachSocketServer
};
