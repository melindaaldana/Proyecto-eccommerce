const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const moment = require("moment");

const Libro = db.Libro;
const Genero = db.Genero;

const librosController = {
  list: (req, res) => {
    Libro.findAll({
      include: {
        model: Genero,
        as: 'genero' // Especifica el alias aquí
      }
    })
      .then(libros => {
        res.render('librosList.ejs', { libros });
      })
      .catch(error => {
        console.log(error);
        res.send('Error al obtener la lista de libros');
      });
  },

  detail: (req, res) => {
    const libroId = req.params.id;

    Libro.findByPk(libroId, {
      include: {
        model: Genero,
        as: 'genero' // Especifica el alias aquí
      }
    })
      .then(libro => {
        if (libro) {
          res.render('librosDetail.ejs', { libro });
        } else {
          res.send('No se encontró el libro');
        }
      })
      .catch(error => {
        console.log(error);
        res.send('Error al obtener el detalle del libro');
      });
  },

  add: (req, res) => {
    const promGeneros = Genero.findAll();

    Promise.all([promGeneros])
      .then(([allGeneros]) => {
        res.render(path.resolve(__dirname, '..', 'views', 'librosAdd'), {
          allGeneros
        });
      })
      .catch(error => {
        console.log(error);
        res.send('Error al obtener los géneros');
      });
  },

  create: function (req, res) {
    Libro.create({
      titulo: req.body.titulo,
      id_genero: req.body.id_genero,
      editorial: req.body.editorial,
      autor: req.body.autor,
      paginas: req.body.paginas,
      precio: req.body.precio,
      stock: req.body.stock,
      imagen: req.body.imagen
    })
      .then(() => {
        return res.redirect("/libros");
      })
      .catch(error => res.send(error));
  },

  edit: function (req, res) {
    let libroId = req.params.id;
    let promLibros = Libro.findByPk(libroId, { include: "genero" });
    let promGeneros = Genero.findAll();
    Promise.all([promLibros, promGeneros])
      .then(([libro, allGeneros]) => {
        libro.release_date = moment(libro.release_date).format("L");
        return res.render(
          path.resolve(__dirname, "..", "views", "librosEdit"),
          { libro, allGeneros }
        );
      })
      .catch(error => res.send(error));
  },

  update: function (req, res) {
    let libroId = req.params.id;
    Libro.update(
      {
        titulo: req.body.titulo,
        id_genero: req.body.id_genero,
        editorial: req.body.editorial,
        autor: req.body.autor,
        paginas: req.body.paginas,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen: req.body.imagen
      },
      {
        where: { id: libroId }
      }
    )
      .then(() => {
        return res.redirect("/libros");
      })
      .catch(error => res.send(error));
  },

  delete: function (req, res) {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
      .then(libro => {
        if (libro) {
          res.render(path.resolve(__dirname, '..', 'views', 'librosDelete'), { libro });
        } else {
          res.send('No se encontró el libro');
        }
      })
      .catch(error => res.send(error));
  },
  
  destroy: function (req, res) {
    let libroId = req.params.id;
    Libro.destroy({ where: { id: libroId } })
      .then(() => {
        return res.redirect('/libros');
      })
      .catch(error => res.send(error));
  }
  


};

module.exports = librosController;


