
const Item = require('../models/Item')

class ItemController {

   // static create (req, res, next) {

   //    Item
   //    .create(req.body)
   //    .then(item => {
   //       res.status(201).json({item})
   //    })
   //    .catch(next)
   // }

   static readOne (req, res, next ) {

      Item
      .findOne({_id: req.params.id})
      .then(item => {
         if(!item) res.status(204).json({message: 'no content'})
         else res.status(200).json({item})
      })
      .catch(next)
   }

   static readAll (req, res, next) {

      Item
      .find()
      .then(items => {
         if(items.length == 0) res.status(204).json({message: 'no content'})
         else res.status(200).json({items})
      })
      .catch(next)
   }

   static updateOne (req, res, next) {
      
      Item
      .updateOne({_id: req.params.id}, {$set: req.body})
      .then(() => {
         res.status(200).json({message: 'update success'})
      })
      .catch(next)
   }

   static deleteOne (req, res, next) {
      
      Item
      .deleteOne({_id: req.params.id})
      .then((err, results) => {
         if(results.deletedCount == 0) throw {
            code: 400,
            message: 'item to be deleted was not found'
         }
         else res.status(200).json({message: 'item deleted'})
      })
      .catch(next)
   }
}

module.exports = ItemController