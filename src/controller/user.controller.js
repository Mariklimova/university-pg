const express = require('express');
const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../service/user.service');
const { IsValidUserId, IsValidUser } = require('../helper/validation');
const { buildResponse } = require('express')

const route = express.Router();

route.post('/', IsValidUser, async (req, res) => {
  try {
    const { name, surname, birth, city, age } = req.body;
    const data = await createUser(name, surname, birth, city, age);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (_req, res) => {
  try {
    const data = await getAllUser();
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id/:info_id', IsValidUserId, IsValidUser, async (req, res) => {
  try {
    const { id, info_id } = req.params;
    const { name, surname, birth, city, age } = req.body;
    const data = await updateUser(id, name, surname, birth, city, age, info_id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

module.exports = route;
