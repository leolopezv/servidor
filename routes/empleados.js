var express = require('express');
var router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Empleado = require('../models').empleado;
const Perfil = require('../models').perfil;

router.get('/findAll/json', function(req, res, next) {
  Empleado.findAll({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [{
      model: Perfil,
      attributes: ["descripcion", "estado"],
      as: 'perfil'
    }]
  })
  .then(empleados => {
    res.json(empleados);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findById/:id/json', function(req, res, next) {
  let id = parseInt(req.params.id);
  Empleado.findOne({
    attributes: { exclude: ["updatedAt", "createdAt"] },
    include: [{
      model: Perfil,
      attributes: ['descripcion', 'estado'],
      as: 'perfil'
    }],
    where: { id: id }
  })
  .then(empleado => {
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).send({ message: "Empleado not found" });
    }
  })
  .catch(error => res.status(400).send(error));
});

router.post('/save', function(req, res, next) {
  let { usuario, nombre, apellido, perfil_id } = req.body;
  Empleado.create({
    usuario: usuario,
    nombre: nombre,
    apellido: apellido,
    perfil_id: perfil_id,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(empleado => {
    res.json(empleado);
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
