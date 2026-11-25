const { body, validationResult } = require("express-validator");

const validateProduct = [

    body("name")
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio"),

    body("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),

    body("price")
        .isNumeric()
        .withMessage("El precio debe ser numérico")
        .custom((value) => value > 0)
        .withMessage("El precio debe ser mayor que cero"),

    body("stock")
        .isNumeric()
        .withMessage("El stock debe ser numérico")
        .custom((value) => value >= 0)
        .withMessage("El stock no puede ser negativo"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = validateProduct;