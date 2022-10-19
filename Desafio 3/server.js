const express = require("express");
const Contenedor = require("./Contenedor");

const app = express();
const PORT = 8080;
const products = new Contenedor("./productos.txt");

app.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

app.get("/productoRandom", async (req, res) => {
  const product = await products.getAll();
  const productRandom = product[Math.floor(Math.random() * product.length)];
  res.json(productRandom);
});

app.get("/productos", async (req, res) => {
  const product = await products.getAll();
  if (product.length > 0) res.json(product);
  else {
    res.status(404).json({ error: "No se encontraron productos" });
  }
});

app.listen(PORT, () =>
  console.log("El servidor esta escuchando en el puerto: " + PORT)
);
