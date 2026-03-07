import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Pencil, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { removeTask } from '../store/store'
import type { Task } from '../types/task'

const STATUS_LABELS: Record<Task['status'], string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
}

const STATUS_COLORS: Record<Task['status'], string> = {
  pending: '#9e9e9e',
  in_progress: '#ff9800',
  completed: '#4caf50',
}

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(ts))
}

interface Props {
  task: Task
}

export default function TaskItem({ task }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  function handleDeleteClick() {
    if (deleteConfirm) {
      dispatch(removeTask(task.id))
    } else {
      setDeleteConfirm(true)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.15 }}
      className="task-item"
      onMouseLeave={() => setDeleteConfirm(false)}
    >
      <div className="task-item-main">
        <div className="task-avatar">{task.title.charAt(0).toUpperCase()}</div>
        <div className="task-content">
          <div className="task-header-row">
            <span className="task-title">{task.title}</span>
            <span className="task-status-badge">
              <span
                className="status-dot"
                style={{ backgroundColor: STATUS_COLORS[task.status] }}
              />
              {STATUS_LABELS[task.status]}
            </span>
          </div>
          <p className="task-description">{task.description}</p>
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="icon-btn edit-btn"
          onClick={() => navigate(`/edit/${task.id}`)}
          title="Edit task"
        >
          <Pencil size={16} />
        </button>
        {deleteConfirm && (
          <span className="delete-confirm-label">Sure?</span>
        )}
        <button
          className="icon-btn delete-btn"
          onClick={handleDeleteClick}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
}
