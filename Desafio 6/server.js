const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const messagesRoute = require("./modules/routes/messages");
const messages = require("./modules/container/messagesContainer");
const productsRoute = require("./modules/routes/products");
const productos = require("./modules/container/productsContainer");

const { json, urlencoded, static } = express;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(static("public"));
app.use("/", productsRoute);
app.use("/mensajes", messagesRoute);

io.on("connection", async (socket) => {
  console.log("Usuario conectado");
  socket.emit("products", productos.getAll());
  socket.emit("messages", await messages.getAll());

  socket.on("client-product", (data) => {
    productos.save(data);
    io.sockets.emit("products", productos.getAll());
  });

  socket.on("client-message", (data) => {
    messages.save(data);
    io.sockets.emit("messages", async () => {
      await messages.getAll();
    });
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Listening in http://localhost:${server.address().port}`);
});
