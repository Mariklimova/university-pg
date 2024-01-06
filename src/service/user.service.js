const { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, deleteUserDB } = require('../repository/user.repository');

async function createUser(name, surname, birth, city, age) {
  const data = await createUserDB(name, surname, birth, city, age);
  return data;
}

async function getAllUser() {
  const data = await getAllUserDB();
  return data;
}

async function getUserById(id) {
  const data = await getUserByIdDB(id);
  return data;
}

async function updateUser(id, name, surname, birth, city, age, info_id) {
  const data = await updateUserDB(id, name, surname, birth, city, age, info_id);
  return data;
}

async function deleteUser(id) {
  const data = await deleteUserDB(id);
  return data;
}

module.exports = { createUser, getAllUser, getUserById, updateUser, deleteUser };
