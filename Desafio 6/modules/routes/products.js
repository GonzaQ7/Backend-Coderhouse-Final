const express = require("express");
const productos = require("../container/productsContainer");
const { Router } = express;

const router = Router();

router.get("", (req, res) => {
  res.render("pages/products");
});

router.post("/productos", (req, res) => {
  const product = req.body;
  productos.save(product);
  res.status(308).redirect("/");
});

module.exports = router;
