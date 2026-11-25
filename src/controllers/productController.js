const Product = require("../models/Product");

// Obtener productos con filtros y paginación
exports.getProducts = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.name) {
            filter.name = {
                $regex: req.query.name,
                $options: "i"
            };
        }

        const totalProducts =
            await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(
                totalProducts / limit
            ),
            products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Crear producto
exports.createProduct = async (req, res) => {
    try {

        const product =
            await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
    try {

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
            "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};