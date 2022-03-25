import { EmpleadoModel } from "../models/empleado.model.js"
import message from '../utils/messages.js'
const { messageGeneral } = message

const empleadoController = {}

// No se usa desde el frontend

empleadoController.listAllEmployees = async (req, res) => {
  try {
    const resp = await EmpleadoModel.find().populate({
      path: 'usuario',
      select: '-password'
    })
    messageGeneral(res, 200, true, resp, 'Lista de Empleados')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.createEmployee = async (req, res) => {
  try {
    const data = req.body
    const resp = await EmpleadoModel.create({ ...data, usuario: req.userid })
    messageGeneral(res, 201, true, resp, 'Empleado Creado')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.listById = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await EmpleadoModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado No Encontrado')
    }
    messageGeneral(res, 200, true, resp, '')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.listEmployeeBoss = async (req, res) => {
  try {
    // const { id } = req.params
    const resp = await EmpleadoModel.find({ usuario: req.userid })
    messageGeneral(res, 200, true, resp, '')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await EmpleadoModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado No Encontrado')
    }
    await resp.deleteOne()
    messageGeneral(res, 200, true, '', 'Empleado Eliminado')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await EmpleadoModel.findById(id)
    if (!resp) {
      return messageGeneral(res, 404, false, '', 'Empleado No Encontrado')
    }
    await resp.updateOne(req.body)
    messageGeneral(res, 200, true, '', 'Empleado Actualizado')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

empleadoController.searchEmployee = async (req, res) => {
  try {
    const { nombre } = req.params
    const resp = await EmpleadoModel.find({
      nombre: { $regex: ".*" + nombre + ".*" },
      usuario: req.userid
    })
    messageGeneral(res, 200, true, resp, '')
  } catch (error) {
    messageGeneral(res, 500, false, error.message)
  }
}

export default empleadoController