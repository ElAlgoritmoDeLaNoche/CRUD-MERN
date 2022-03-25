import mongoose from 'mongoose'

// const URI = 'mongodb://localhost/prueba'
const URI = 'mongodb+srv://crudmern:crudmern@cluster0.qpru2.mongodb.net/crudmern'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI)
    console.log(`Base de datos conectada, ${db.connection.name}`);
  } catch (error) {
    console.log(`Error en la conexión a la base de datos, ${error.message}`);
  }
}

export default connectDB