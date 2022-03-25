import { Router } from 'express'
import empleadoController from '../controllers/empleado.controller.js'
import { verificarToken } from '../middlewares/Auth.js'
const route = Router()

route.get('/', empleadoController.listAllEmployees)
route.post('/', verificarToken, empleadoController.createEmployee)
route.get('/listid/:id', verificarToken, empleadoController.listById)
route.get('/geb', verificarToken, empleadoController.listEmployeeBoss)
route.delete('/delete/:id', verificarToken, empleadoController.deleteEmployee)
route.put('/update/:id', verificarToken, empleadoController.updateEmployee)
route.get('/search/:nombre', verificarToken, empleadoController.searchEmployee)

export default route