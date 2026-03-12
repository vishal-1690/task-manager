import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { ArrowLeft, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import TaskList from './components/TaskList'
// import AddTaskForm from './components/AddTaskForm'
import EditTaskForm from './components/EditTaskForm'
import { nanoid } from '@reduxjs/toolkit'

function App() {
  const navigate = useNavigate()
  const loc = useLocation()
  const isRoot = loc.pathname === '/'

  return (
    <>
      <div className='shell-container'>
        <header className='shell-header'>
          <AnimatePresence mode='wait' initial={false}>
            {isRoot ? (
              <motion.div
                key='header-home'
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className='header-title'
              >
                TO-DO APP
              </motion.div>
            ) : (
              <motion.div
                key={`header-${loc.pathname}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className='shell-header-inner'
              >
                <button className='ghost' onClick={() => navigate(-1)}><ArrowLeft /></button>
                <span className='header-title'>
                  {loc.pathname === '/add' ? 'Add Task' : 'Edit Task'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className='page-content'>
          <Routes>
            <Route index Component={TaskList} />
            {/* <Route path='/add' Component={AddTaskForm} /> */}
            <Route path='/task/:id' Component={EditTaskForm} />
          </Routes>
        </div>
      </div>

      {isRoot && (
        <button className='add-task' onClick={() => navigate(`/task/${nanoid()}`)}>
          <Plus />
        </button>
      )}
    </>
  )
}

export default App
