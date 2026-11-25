const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const validateProduct = require("../validators/productValidator");

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Todos los usuarios autenticados pueden consultar
router.get(
    "/",
    authMiddleware,
    authorizeRole("admin", "user"),
    getProducts
);

// Solo administradores pueden crear
router.post(
    "/",
    authMiddleware,
    authorizeRole("admin"),
    validateProduct,
    createProduct
);

// Solo administradores pueden actualizar
router.put(
     "/:id",
     authMiddleware,
     authorizeRole("admin"),
     validateProduct,
     updateProduct
 );

// Solo administradores pueden eliminar
router.delete(
     "/:id",
     authMiddleware,
     authorizeRole("admin"),
     deleteProduct
 );

module.exports = router;