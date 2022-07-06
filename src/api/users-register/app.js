const { DuplicationError } = require('/imobiliario/commons/errors')
const db = require('/imobiliario/commons/db')
const userIndex = db.in('users')

module.exports = ({ body: { email, password } }, res) => {
  const users = userIndex.getIndexesFromProp({ email })
  if (users.length) throw new DuplicationError({ email })

  const user = userIndex.new()
  const created_at = Date.now().toString()
  user.writeMany({ email, password, created_at })
  return res.json({ id: user.getId(), created_at })
}
