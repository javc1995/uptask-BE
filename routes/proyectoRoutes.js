import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyectos,
    agregarColaborador,
    EliminarColaborador,
}
    from "../controllers/proyectoController.js"
import checkAuth from "../middleware/checkAuth.js";
import express from 'express'

const router = express.Router();

router.route('/').get(checkAuth, obtenerProyectos).post(checkAuth, nuevoProyecto)
router.route('/:id').get(checkAuth, obtenerProyecto).put(checkAuth, editarProyecto).delete(checkAuth, eliminarProyectos)
router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, EliminarColaborador)

export default router