import mongoose from "mongoose"
import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find()
    .where('creador').equals(req.usuario)
    .select('-tareas')
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        return res.send(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error('Proyecto no existe')
        return res.status(404).json({ msg: error.message })
    }
   
    const proyecto = await Proyecto.findById(id)
    .populate('tareas')

    if(!proyecto){
        return res.status(404).json({ msg: "No encontrado"})
    }
    
    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({ msg: "Accion no válida"})
    }

    // Obtener las taras del proyecto
    
    // const tareas = await Tarea.find()
    // .where('proyecto').equals(proyecto._id)


    res.json(proyecto)

}

const editarProyecto = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error('Proyecto no existe')
        return res.status(404).json({ msg: error.message })
    }
   
    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        return res.status(404).json({ msg: "No encontrado"})
    }
    
    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({ msg: "Accion no válida"})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" }) // Manejo de errores
    }

    // res.json(proyecto)
}

const eliminarProyectos = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)
    if(!valid){
        const error = new Error('Proyecto no existe')
        return res.status(404).json({ msg: error.message })
    }
   
    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        return res.status(404).json({ msg: "No encontrado"})
    }
    
    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({ msg: "Accion no válida"})
    }

    try {
        await proyecto.deleteOne()
        res.json({msg:'Proyecto eliminado'})
    } catch (error) {
        console.log(error)
    }
}

const agregarColaborador = async (req, res) => {

}

const EliminarColaborador = async (req, res) => {

}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyectos,
    agregarColaborador,
    EliminarColaborador,
}