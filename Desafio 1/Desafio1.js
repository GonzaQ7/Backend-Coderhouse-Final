class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return console.log(`${this.nombre} ${this.apellido}`);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }

  addMascota(mascotas) {
    this.mascotas.push(mascotas);
  }

  getBook() {
    return this.libros.map((libros) => libros.nombre);
  }
}

const usuario = new Usuario(
  "Gonzalo",
  "Quiroga",
  [
    {
      nombre: "Cien años de soledad",
      autor: "Gabriel García Márquez",
    },
    {
      nombre: "La Odisea",
      autor: "Homero",
    },
  ],
  ["Titan", "Teo", "Toto"]
);

usuario.getFullName();
console.log(usuario.countMascotas());
usuario.addMascota("Firulais");
console.log(usuario.countMascotas());
console.log(usuario.getBook());
usuario.addBook("Harry Potter y la piedra filosofal", "J. K. Rowling");
console.log(usuario.getBook());
