const express = require("express")();
const http = require("http").createServer(express);
const io = require("socket.io")(http);

let people = [];

io.on('connection', (socket) => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);
    people.push(id)
    console.log(people);
    socket.on("chat message", ({nickname, msg}) => {
        console.log(`${id}: ${msg}`);
        io.emit("chat message", {nickname ,msg})
    });
    socket.on('disconnect', () => {
        people.splice(people.indexOf(id), 1);
        console.log(people);
    })
})

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
