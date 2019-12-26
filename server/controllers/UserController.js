const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class UserController
{
    static test(req,res)
      {
          res.send('Hello User Connected')
      }


    static findAll(req,res,next)
      {
          User.find()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static register(req,res,next)
      {
        const { username, email, password, role } = req.body
        User.create({
            username, email, password, role
        })
        .then(result=>{
            console.log('result')
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err) 
            next(err)
        })
      }


    static login(req,res,next)
      {
          const { email, password } = req.body
          console.log('email nih', email)
          User.findOne({
              email
          })
          .then(result=>{
              console.log('ketemu nih')
              if ( comparePassword( password, result.password) )
                {
                    const token = generateToken({ _id: result._id})
                    res.status(200).json( { username: result.username, role:result.role, access_token: token,})
                }
              else
                {
                    next ({ code : 400, message: "email & password combination is wrong"})
                }
          })
          .catch(err=>{
              next({code:404, message:'user not found'})
          })
      }


    static gSignIn(req,res,next)
      {

      }

    static masterDeleteAll(req,res,next)
      {
        User.remove()
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }
}


module.exports = UserController