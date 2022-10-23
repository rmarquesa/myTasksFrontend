import React, { useState, useEffect, ChangeEvent } from 'react'
import { ButtonGroup, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api';

interface ITasks {
  title: string;
  description: string;
}

const TaskForm: React.FC = () => {

  const history = useNavigate()
  const { id } = useParams()

  const [model, setModel] = useState<ITasks>({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (id !== undefined) {findTask(`${id}`)}
  }, [id])


  function back() {
    history(-1)
  }

  function updatedModel(event: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [event.target.name]: event.target.value
    })
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    if (id !== undefined) {
      await api.put(`/tasks/${id}`, model)
    } else {
      await api.post('/tasks', model)
    } 
    back()
  }

  async function findTask(id: string) {
    const response = await api.get(`tasks/${id}`)
    setModel({
      title: response.data.title,
      description: response.data.description
    })
  }

  return( 
    <div className='container'>
      <br />
      <div>
        <h1>{
          id === undefined ? "Creating a new task" : `Editing task ${id}`
          
          }</h1>
        <hr />
        <Button variant="outline-info" size='sm' onClick={back}>Back</Button>
      </div>
      <br />
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required={true}
              type="text" 
              name='title'
              value={model.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required={true}
              as="textarea"
              rows={3}
              name='description'
              value={model.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
            />
          </Form.Group>
          <br />
          <ButtonGroup size="sm">
            <Button variant="outline-success" type="submit">Save</Button>
            <Button variant="outline-danger" onClick={back}>Cancel</Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>);
}

export default TaskForm;