import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import Swal from 'sweetalert2'

export const ModalActions = ({ open, onCloseModal, getEmployees, edit, employee }) => {

  const initialState = {
    nombre: '',
    apellido: '',
    id: '',
    tcontrato: 'Fijo'
  }

  const [dataEmployee, setDataEmployee] = useState(initialState)
  const tcontrato = ['Fijo', 'Temporal', 'Practicante']
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    edit ? setDataEmployee(employee) : setDataEmployee(initialState)
  }, [edit, employee])

  const handleChange = (e) => {
    setDataEmployee({ ...dataEmployee, [e.target.name]: e.target.value })
  }

  const actions = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let resp = {}
      edit
        ? (
          resp = await axios.put(`/employee/update/${employee._id}`, dataEmployee)
        )
        :
        (
          resp = await axios.post('/employee', dataEmployee)
        )
      Swal.fire({
        icon: 'success',
        title: resp.data.message,
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false)
      onCloseModal()
      getEmployees()
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
      console.log('Error en la función actions', error.message)
    }
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="card">
          <div className="card-header">
            <h5>{edit ? 'Actualizar Empleado' : 'Agregar Empleado'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={actions}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  required
                  autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.nombre}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.apellido}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Identificación</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de Contrato</label>
                <select
                  name="tcontrato"
                  className="form-select"
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.tcontrato}
                >
                  {
                    tcontrato.map((item, i) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))
                  }
                </select>
              </div>
              {
                !loading ? (
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary form-control">{edit ? 'Actualizar' : 'Guardar'}</button>
                  </div>
                ) : (
                  <button className="btn btn-primary form-control" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {" "}
                    {edit ? ' Actualizando' : ' Guardando'}
                  </button>
                )
              }
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}
