function passwordRandomizer(){
const dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const passLength = Math.max( Math.round(Math.random()*20), 5)

let randomPassword = ''
for (let x = 0; x < passLength; x++)
  {
      randomPassword += dict[ Math.round(Math.random() * (dict.length-1) ) ]
  }

return randomPassword
}



module.exports = passwordRandomizer