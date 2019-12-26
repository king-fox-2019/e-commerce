const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(5)


function generateHashed(password)
  {
      return bcryptjs.hashSync(password)
  }


function comparePassword(inputPassword, queryPassword)
  {
      return bcryptjs.compareSync(inputPassword, queryPassword)
  }


module.exports ={
    generateHashed,
    comparePassword
}