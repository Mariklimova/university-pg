const pool = require('../db');

async function createUserDB(name, surname, birth, city, age) {
  const client = await pool.connect();
  const sql1 = 'INSERT INTO users_info(birth, city, age)VALUES($1,$2,$3) RETURNING *';
  const { rows } = await client.query(sql1, [birth, city, age]);

  const sql2 = 'INSERT INTO users(name, surname,info_id)VALUES($1,$2,$3) RETURNING *';
  const { rows: rows2 } = await client.query(sql2, [name, surname, rows[0].id]);

  return { ...rows2[0], ...rows[0] };
}

async function getAllUserDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users_info JOIN users ON users.info_id = users_info.id';
  const { rows } = await client.query(sql);
  return rows;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users JOIN users_info ON users.info_id = users_info.id WHERE users_info.id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function updateUserDB(id, name, surname, birth, city, age, info_id) {
  const client = await pool.connect();
  const sql1 = 'UPDATE users_info SET birth = $2, city = $3, age = $4 WHERE id = $1 RETURNING *';
  const { rows } = await client.query(sql1, [id, birth, city, age]);

  const sql2 = 'UPDATE users SET name = $2, surname = $3,info_id = $4 WHERE id = $1 RETURNING *';
  const { rows: rows2 } = await client.query(sql2, [id, name, surname, info_id]);

  return { ...rows2[0], ...rows[0] };
}

async function deleteUserDB(id) {
  const client = await pool.connect();
  const sql1 = 'DELETE FROM users_info WHERE id = $1 RETURNING *';
  const { rows } = await client.query(sql1, [id]);
  return rows;
  // const sql2 = 'DELETE FROM users WHERE id = $1 RETURNING *';
  // const { rows:rows2 } = await client.query(sql2,[id]);
  // return { ...rows2[0], ...rows[0] }
}

module.exports = { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, deleteUserDB };
