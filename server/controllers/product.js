const Product = require('../models/product')
const toUpdate = require('../helpers/updateField')
const gcsDelete = require('../helpers/gcsdelete')

class ProductController {

    static addProduct(req, res, next) {
        let { name, stock, description, price } = req.body
        Product.create({
            name: name,
            stock: stock,
            description: description,
            price: price,
            category: req.body.category.split(','),
            image: req.file ? req.file.cloudStoragePublicUrl : 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
        })
            .then(newProduct => {
                res.status(201).json({ newProduct })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        let target = req.query.name || ''
        Product.find({ name: { $regex: target } })
            .sort({ updatedAt: 'desc' })
            .then(products => {
                // console.log(products)
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static findByCategory(req, res, next) {
        const category = req.params.category;
        Product.find()
            .then(products => {
                let specifiedProduct = []
                products.forEach(product => {
                    product.category.forEach(el => {
                        if (el == category) specifiedProduct.push(product)
                    })
                })
                if (specifiedProduct.length == 0) next({ status: 404, msg: 'Not found' })
                else {
                    res.status(200).json({ products: specifiedProduct })
                }
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let _id = req.params.id
        let dataChanged = toUpdate(["name", "stock", "description", "price", "category"], req.body)
        // console.log(req.body);
        if (req.file) {
            // console.log(`suk`);
            dataChanged.image = req.file.cloudStoragePublicUrl
            // console.log(dataChanged.image);
            Product.findById(_id)
                .then(product => {
                    gcsDelete(product.image)
                    return Product.findByIdAndUpdate(
                        _id,
                        {
                            $set: dataChanged
                        },
                        {
                            omitUndefined: true,
                            setDefaultsOnInsert: true,
                            new: true
                        })
                })

                .then(product => {

                    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++', product);
                    res.status(201).json({ product, message: 'success update product' })
                })
                .catch(next)
        } else {
            Product.findOne({ _id: _id })
                .select('image')
                .then(product => {
                    // console.log(product);
                    dataChanged.image = product.image
                    // console.log(dataChanged);
                    return Product.findByIdAndUpdate(
                        _id,
                        {
                            $set: dataChanged
                        },
                        {
                            upsert: true,
                            omitUndefined: true,
                            runValidators: true,
                            setDefaultsOnInsert: true,
                            new: true
                        })
                })
                .then(product => {
                    // console.log(product);
                    res.status(200).json({ product, message: 'success update product' })
                })
                .catch(next)
        }
    }

    // static updateField(req, res, next) {
    //     let dataChanged = toUpdate(["name", "stock", "description", "price"], req.body)
    //     dataChanged.image = req.file ? req.file.cloudStoragePublicUrl : 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg'
    //     // console.log(dataChanged);
    //     const _id = req.params.id;
    //     Product.findByIdAndUpdate(
    //         _id,
    //         {
    //             $set: { dataChanged }
    //         },
    //         {
    //             omitUndefined: true,
    //             new: true,
    //             runValidators: true,
    //             setDefaultsOnInsert: true
    //         })
    //         .then(product => {
    //             console.log(product);
    //             res.status(201).json({ product, message: 'success update product' })
    //         })
    //         .catch(next)
    // }

    static delete(req, res, next) {
        // console.log('masukkk');
        const _id = req.params.id;
        Product.findById({ _id })
            .then(product => {
                if (!product) {
                    throw ({ status: 404, message: 'Not found' })
                } else {
                    gcsDelete(product.image)
                    return Product.findByIdAndDelete(_id)
                }
            })
            .then(success => {
                res.status(200).json({ success, message: 'success deleting product' })
            })
            .catch(next)
    }

}

module.exports = ProductController