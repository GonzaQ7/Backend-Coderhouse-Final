const fs = require("fs");

class Contenedor {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo;
  }

  async #leerUnArchivo() {
    try {
      const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
      const contenidoParseado = JSON.parse(contenido);

      return contenidoParseado;
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    const contenidoArchivo = await this.#leerUnArchivo();

    if (contenidoArchivo.length !== 0) {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(
          [
            ...contenidoArchivo,
            {
              ...obj,
              id: contenidoArchivo[contenidoArchivo.length - 1].id + 1,
            },
          ],
          null,
          2
        ),
        "utf-8"
      );
      console.log("Producto guardado correctamente!");
    } else {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([{ ...obj, id: 1 }]),
        "utf-8"
      );
      console.log("Producto guardado correctamente!");
    }
  }

  async getById(id) {
    const contenidoArchivo = await this.#leerUnArchivo();
    const producto = contenidoArchivo.filter((item) => item.id === id);
    if (producto.length > 0) {
      console.log("Producto encontrado: " + JSON.stringify(producto, true, 2));
    } else {
      console.log("Lo sentimos el id del producto no existe");
    }
  }

  async getAll() {
    const contenidoArchivo = await this.#leerUnArchivo();
    return contenidoArchivo;
  }

  async deleteById(id) {
    const contenidoArchivo = await this.#leerUnArchivo();
    const idEliminada = contenidoArchivo.filter((item) => item.id === id);
    const idNoEliminada = contenidoArchivo.filter((item) => item.id !== id);

    if (idEliminada.length > 0) {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify(idNoEliminada, true, 2),
        "utf-8"
      );
      console.log("Producto eliminado!");
    } else {
      console.log("No existe ningun producto con esa id");
    }
  }

  async deleteAll() {
    const contenidoArchivo = await this.#leerUnArchivo();
    if (contenidoArchivo.length > 0) {
      await fs.promises.writeFile(
        this.rutaArchivo,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      console.log(
        "Sus productos han sido eliminados correctamente de nuestra base de datos!"
      );
    } else {
      console.log("No hay productos en nuestra base de datos!");
    }
  }
}

const contenedor = new Contenedor("./productos.txt");

module.exports = Contenedor;
// contenedor.save({
//   nombre: "Iphone 1",
//   precio: 1000,
//   thumbnail:
//     "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone13pro-digitalmat-gallery-3-202203?wid=364&hei=333&fmt=png-alpha&.v=1644988094612",
// });

// contenedor.getById(3);

// contenedor.getAll();

// contenedor.deleteById(2);

// contenedor.deleteAll();
