import { Router } from 'express'
import userController from '../controllers/usuario.controller.js'
const route = Router()

route.post('/register', userController.register)
route.post('/login', userController.login)

export default route