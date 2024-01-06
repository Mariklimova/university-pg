const express = require('express');
const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../service/user.service');
const { IsValidUserId } = require('../helper/validation');
const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const { name, surname, birth, city, age } = req.body;
    const data = await createUser(name, surname, birth, city, age);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllUser();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.get('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.put('/:id/:info_id', IsValidUserId, async (req, res) => {
  try {
    const { id, info_id } = req.params;
    const { name, surname, birth, city, age } = req.body;
    const data = await updateUser(id, name, surname, birth, city, age, info_id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.delete('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = route;
