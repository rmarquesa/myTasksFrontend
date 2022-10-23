import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TaskForm from './pages/Tasks/Forms'
import TaskDetail from './pages/Tasks/Detail'


const routes: React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />}/>
      <Route path="/newtask" element={<TaskForm />}/>
      <Route path="/newtask/:id" element={<TaskForm />}/>
      <Route path="/tasks/:id" element={<TaskDetail />}/>
    </Routes>
  );
}

export default routes