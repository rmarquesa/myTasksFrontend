import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

interface ITasks {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<ITasks[]>([])

  const history = useNavigate()
  
  useEffect(() => {
    loadTasks()
  },[])

  async function loadTasks() {
    const response = await api.get('/tasks')
    setTasks(response.data.sort((a: any, b: any) => (a.title > b.title) ? 1 : -1))
  }

  function newTask() {
    history('/newtask')
  }

  function editTask(id: number) {
    history(`/newtask/${id}`)
  }

  function viewTask(id: number) {
    history(`/tasks/${id}`)
  }

  async function finishTask(id: number) {
    await api.patch(`/tasks/${id}`, {'finished':true})
    loadTasks()
  }

  async function reopenTask(id: number) {
    await api.patch(`/tasks/${id}`, {'finished':false})
    loadTasks()
  }

  async function removeTask(id: number) {
    window.confirm(
      "Do you realy want remove this task?"
    ) ? await api.delete(`/tasks/${id}`) : loadTasks()
    loadTasks()
  }

  // Save reference for dragItem and dragOverItem
  const dragItem=React.useRef<any>(null)
  const dragOverItem=React.useRef<any>(null)

  const handleSort = () => {
    // duplicate items
    const _tasks = [...tasks]

    // remove and save the dragged item content
    const draggetItemContent = _tasks.splice(dragItem.current, 1)[0]

    // switch the position
    _tasks.splice(dragOverItem.current, 0, draggetItemContent)

    // reset the position ref
    dragItem.current = null
    dragOverItem.current = null

    //update the actual array
    setTasks(_tasks)
  }
 
  return(
    <>
      <div className='container'>
        <br />
        <div>
          <h1>Task Page</h1>
          <hr />
          <Button variant="outline-info" onClick={newTask} size='sm'>New Task</Button>
        </div>
        <br />
        <Table striped bordered hover className='tasksTable'>
          <thead>
            <tr>
            
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map((task, index) => (             
                <tr 
                  key={task.id}
                  draggable 
                  onDragEnd={handleSort}
                  onDragStart={(event) => dragItem.current=index}
                  onDragEnter={(event) => dragOverItem.current=index}
                  onDragOver={(event) => event.preventDefault()}   
                >
                <td 
                  title="Double click to see more details"
                  onDoubleClick={() => viewTask(task.id)}
                >
                  {task.title.substring(0,30)}</td>
                <td 
                  title="Double click to see more details"
                  onDoubleClick={() => viewTask(task.id)}
                >
                  {task.description.substring(0,300)}</td>         
                <td>
                  <Button
                    size="sm"
                    variant={task.finished ? "success" : "warning"}
                    title={task.finished ? "Click to reopen" : "Click to close"}
                    onClick={
                      () => task.finished ? reopenTask(task.id) : finishTask(task.id)
                    }
                  >{task.finished ? "Finished" : "Pending"} <i className={task.finished ? "bi bi-award" : "bi bi-hourglass-split"} />
                  </Button>
                </td>
                <td>
                  <i className="bi bi-search" onClick={() => viewTask(task.id)} style={{ cursor: 'pointer', marginRight: '1em'}} title='View task'/>
                  <i className="bi bi-pencil" onClick={() => editTask(task.id)} style={{ cursor: 'pointer', marginRight: '1em'}} title='Edit task'/>
                  <i className="bi bi-trash" onClick={() => removeTask(task.id)} style={{ cursor: 'pointer',}} title='Remove task'/>
                </td>          
              </tr>
              ))
            }
          </tbody>
        </Table>        
      </div>;
    </>
  )
}

export default Tasks;