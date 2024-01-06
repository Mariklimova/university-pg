function IsValidUserId(req, _res, next) {
  const { id, info_id } = req.params;

  if (id) checkId(id);

  if (info_id) {
    checkId(info_id);
  }

  next();
}

function checkId(data) {
  if (typeof data != 'number' && typeof data != 'string') throw new Error(' type id not valid');
  if (isNaN(data)) throw new Error('id not number');
  if (data < 0) throw new Error(' id < 0');
}

function IsValidUser(req, _res, next) {
  const { name, surname, birth, city, age } = req.body;
  if (!isNaN(name)) throw new Error('name not string');
  if (!isNaN(surname)) throw new Error('name not string');
  if (!isNaN(birth)) throw new Error('name not string');
  if (!isNaN(city)) throw new Error('name not string');
  if (isNaN(age)) throw new Error('name not number');
  next();
}

module.exports = { IsValidUser, IsValidUserId };
