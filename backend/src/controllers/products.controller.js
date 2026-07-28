const productModel = require('../models/product.model');

const productsController = async (req, res) => {
    const data = await productModel.find();
    res.json({
        message: "Successfully fetched.",
        data
    })
}

const singleProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findOne({
            id
        })
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        res.json({
            message: "Product not found"
        })
    }
}

const createProductController = async (req, res) => {
    try {
        const { id, title, description, category, price, image } = req.body;
        await productModel.create({
            id: id, title: title, description: description, category: category, price: price, image: image
        })
        res.status(201).json({
            message: "Product Added Successfully"
        })
    } catch (err) {
        res.status(401).json({
            message: "Product not added"
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;

        const data = await productModel.findOneAndUpdate({ id: id }, updatedProduct);

        res.json({
            message: "Product Updated Successfully",
            data
        })

    } catch (err) {
        res.status(401).json({
            message: "Product Not Updated"
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findOneAndDelete({ id: id });

        if (!product) {
            return res.status(401).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product Deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: "Request Failed"
        })
    }

}
module.exports = { productsController, singleProductController, createProductController, updateProductController, deleteProductController }