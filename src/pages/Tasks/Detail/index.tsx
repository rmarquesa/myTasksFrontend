import React, { useState, useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api';
import moment from 'moment';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {
  
  const history = useNavigate()
  const { id } = useParams()
  const [task, setTask] = useState<ITask>()
  const created_at = new Date(task?.created_at as Date).toLocaleString()
  const updated_at = new Date(task?.updated_at as Date).toLocaleString()
  const currentDuration = new Date(moment().diff(moment(task?.created_at))).toLocaleTimeString()
  const totalDuration = new Date(moment(task?.updated_at).diff(moment(task?.created_at))).toLocaleTimeString()

  function back() {
    history(-1)
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`)
    //console.log(response)
    setTask(response.data)
  }

  useEffect(() => {
    findTask()
  }, [])


  return(
    <div className='container'>
      <br />
      <div>
        <h1>Task Detail</h1>
        <hr />
        <Button variant="outline-info" size='sm' onClick={back}>Back</Button>
      </div>
        <br />
        <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>{task?.description}</Card.Text>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
              <Badge bg={task?.finished ? "success": "warning"}>{task?.finished ? "Finished": "Pending"}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                Created at: {created_at}<br />
                {task?.finished ? "Finished at: " : "Updated at: "}{updated_at}<br />
                {task?.finished ? `Total Duration: ${totalDuration}`: `Current Duration: ${currentDuration}`}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
        
      </Card>
    </div>
  );
}

export default Detail;