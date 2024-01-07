function IsValidUserId(req, _res, next) {
  const { id, info_id } = req.params;

  if (id) checkId(id);

  if (info_id) checkId(info_id);

  next();
}

function checkId(data) {
  if (typeof data != 'number' && typeof data != 'string') throw new Error('type id not valid');
  if (isNaN(data)) throw new Error('id not number');
  if (data < 0) throw new Error(' id < 0');
}

function IsValidUser(req, _res, next) {
  const { name, surname, birth, city, age } = req.body;

  if (typeof name != 'string') throw new Error('type name not valid');
  if (typeof surname != 'string') throw new Error('type surname not valid');
  if (typeof city != 'string') throw new Error('type city not valid');
  if (!isNaN(name)) throw new Error('name not string');
  if (!isNaN(surname)) throw new Error('surname not string');
  if (!isNaN(birth)) throw new Error('birth not string');
  if (!isNaN(city)) throw new Error('city not string');
  if (isNaN(age)) throw new Error('age not number');
  if (!/^\d{4}-\d{2}-\d{2}$/gm.test(birth)) throw new Error('birth not valid');
  if (age < 0) throw new Error('age not valid');

  next();
}

module.exports = { IsValidUser, IsValidUserId };
