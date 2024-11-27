const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/', usuariosController.obtenerTodosUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);


// router.get('/dashboard', authenticate, async (req, res) => {
//     try {
//         const misAds = await adService.getAllAds();
//         res.render('userDashboard', { 
//             role: 'user',
//             userid: req.user.id,
//             ads: misAds
//         });
//     } catch (error) {
//         res.status(500).json({ mensaje: error.message });
//     }
// });


module.exports = router;
