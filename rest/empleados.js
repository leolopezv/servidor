var express = require('express');
var router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [{
      model: Etiqueta,
      attributes: ["texto"],
      through: { attributes: [] }
    }]
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findById/:id/json', function(req, res, next) {
  let id = parseInt(req.params.id);
  Foto.findOne({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }],
    where: { id: id }
  })
  .then(foto => {
    if (foto) {
      res.json(foto);
    } else {
      res.status(404).send({ message: "Photo not found" });
    }
  })
  .catch(error => res.status(400).send(error));
});

router.post('/save', function(req, res, next) {
  let { usuario, nombre, apellido, perfil } = req.body;
  Foto.create({
    usuario: usuario,
    nombre: nombre,
    apellido: apellido,
    perfil_id: perfil,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(foto => {
    res.json(foto);
  })
  .catch(error => res.status(400).send(error));
});

router.delete('/delete/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  Empleado.destroy({
    where: { id: id }
  })
  .then(respuesta => {
    res.json(respuesta);
  })
  .catch(error => res.status(400).send(error));
});

module.exports = router;
