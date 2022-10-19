class Productos {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  getAll() {
    return [...this.productos];
  }

  filtrar(id) {
    const producto = this.productos.find((producto) => producto.id == id);
    return producto || { error: "No se ha encontrado el producto" };
  }

  save(producto) {
    const productoNuevo = { ...producto, id: ++this.id };
    this.productos.push(productoNuevo);
    return productoNuevo;
  }

  borrar(id) {
    const productoEliminado = this.productos.find(
      (producto) => producto.id == id
    );
    const productos = this.productos.filter((producto) => producto.id != id);
    if (productoEliminado) {
      this.productos = productos;
    } else {
      return { error: "Producto no encontrado" };
    }
  }

  actualizar(product, id) {
    const newProd = { id: Number(id), ...product };
    const index = this.productos.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      this.productos[index] = newProd;
      return newProd;
    } else {
      return { error: "Producto no encontrado" };
    }
  }
}

module.exports = Productos;
