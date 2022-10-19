const express = require("express");
const { Router } = express;
const Productos = require("./api/productos.js");

const productos = new Productos();
const router = new Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.json(productos.getAll());
});

router.get("/:id", (req, res) => {
  res.json(productos.filtrar(req.params.id));
});

router.post("/", (req, res) => {
  res.json(productos.save(req.body));
});

router.put("/:id", (req, res) => {
  res.json(productos.actualizar(req.body, req.params.id));
});

router.delete("/:id", (req, res) => {
  res.json(productos.borrar(req.params.id));
});

//Server
const app = express();
app.use(express.static("./public"));
app.use("/api/productos", router);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en puerto: " + PORT);
});
server.on("error", (error) => console.log("Error en el servidor: " + error));
