require('dotenv').config();

const io = require("socket.io")(process.env.SOCKET_PORT,{
    cors: {
        origin: process.env.CORS_ORIGIN,
        method: ['GET','POST']
    }
});

io.on('connection',(socket) => {
    console.log("User Connected");
    socket.on("comment", (data) => {
        io.emit("comment", data);
    });
    socket.on("disconnect",() => {
        console.log("User disconnected");
    })
})