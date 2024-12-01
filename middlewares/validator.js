const { check, body, validationResult } = require('express-validator');

// Validación de registro
const validarRegistro = [
    // Validación para el campo email
    check('email')
        .isEmail().withMessage('El correo debe ser válido')
        .normalizeEmail(),  // Limpia el formato del correo

    // Validación para el campo nombre
    check('nombre')
        .not().isEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    // Validación para el campo contraseña
    check('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula')  // Mayúsculas
        .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una letra minúscula')  // Minúsculas
        .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número')  // Números
        .matches(/[@$!%*?&#]/).withMessage('La contraseña debe tener al menos un símbolo especial (@, $, !, %, etc.)'),

    // Confirmar que la contraseña y la confirmación sean iguales
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),


    // Validación para años de experiencia
    check('anos_experiencia')
        .isInt({ min: 1, max: 20 }).withMessage('Los años de experiencia deben ser un número entero positivo')
        .not().isEmpty().withMessage('El campo años de experiencia es obligatorio'),

    // Validación para especialidad
    check('especialidad')
        .not().equals('Selecciona tu estilo').withMessage('Debes seleccionar una especialidad'),

    // Validación para la foto (si es obligatoria)
    check('foto')
        .custom((value, { req }) => {
            // Verificar si el archivo 'foto' está presente en 'req.files'
            if (!req.files || !req.files.foto) {
                throw new Error('La foto es obligatoria');
                
            }
            // Verificar la extensión del archivo solo si está presente
            const file = req.files.foto;
            const fileExtension = file.name.split('.').pop();
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (!validExtensions.includes(fileExtension)) {
                throw new Error('La foto debe tener una extensión válida (jpg, jpeg, png, gif)');
            }

            return true;
        }),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    }
];



module.exports = validarRegistro;
