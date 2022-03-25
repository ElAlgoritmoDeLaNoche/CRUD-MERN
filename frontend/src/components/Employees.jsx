import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-responsive-modal/styles.css'
import { useUser } from '../context/UserContext'
import { ModalActions } from './ModalActions'
import { Loading } from './Loading'

export const Employees = () => {

  const { user } = useUser()
  const [empleados, setEmpleados] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(false)

  const getEmployees = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/employee/geb')
      setEmpleados(data.data)
      setFilterData(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      console.log('Error en la función getEmployees', error.message)
    }
  }, [])

  useEffect(() => {
    getEmployees()
  }, [getEmployees])

  const deleteEmployee = (id) => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Esta Acción No Es Reversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete('/employee/delete/' + id)
        getEmployees()
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  // Modal
  const [employee, setEmployee] = useState(false)
  const [edit, setEdit] = useState(false)
  const [open, setOpen] = useState(false);
  const onOpenModal = (edit, employee) => {
    setOpen(true)
    setEdit(edit)
    setEmployee(employee)
  };
  const onCloseModal = () => setOpen(false);

  // Busqueda
  const search = async (value) => {
    let updatedData = []
    if (value.length) {
      updatedData = empleados.filter(item => {
        const startWith = item.nombre.toLowerCase().startsWith(value.toLowerCase()) || item.apellido.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.nombre.toLowerCase().includes(value.toLowerCase()) || item.apellido.toLowerCase().includes(value.toLowerCase())

        if (startWith) {
          return startWith
        } else if (!startWith && includes) {
          return includes
        } else return null
      })
      setFilterData(updatedData)
    } else {
      setFilterData(empleados)
    }
  }

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={() => onOpenModal(false, {})}>
              <i className="fa-solid fa-plus"></i> Agregar Empleado
            </button>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar" aria-label="Search" required onChange={(e) => search(e.target.value)} />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Empleados de {user.name}</h4>
                </div>
                {
                  loading
                    ?
                    (
                      <Loading />
                    )
                    :
                    (
                      <div className="table-responsive-lg">
                        <table className="table table-striped">
                          <thead className="table-dark">
                            <tr>
                              <th>#</th>
                              <th>Nombre</th>
                              <th>Apellido</th>
                              <th>ID</th>
                              <th>Tipo de Contrato</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              filterData.map((item, i) => (
                                <tr key={item._id}>
                                  <td>{i + 1}</td>
                                  <td>{item.nombre}</td>
                                  <td>{item.apellido}</td>
                                  <td>{item.id}</td>
                                  <td>{item.tcontrato}</td>
                                  <td>
                                    <button className="btn btn-warning me-1" onClick={() => onOpenModal(true, item)}>
                                      <i className="fa-solid fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteEmployee(item._id)}>
                                      <i className="fa-solid fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalActions
        open={open}
        onCloseModal={onCloseModal}
        getEmployees={getEmployees}
        edit={edit}
        employee={employee}
      />
    </div>
  )
}
