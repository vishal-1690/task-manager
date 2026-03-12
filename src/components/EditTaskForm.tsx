import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { updateTask, type RootState } from '../store/store'
import type { TaskStatus } from '../types/task'

const STATUS_OPTIONS: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: '#9e9e9e' },
  { value: 'in_progress', label: 'In Progress', color: '#ff9800' },
  { value: 'completed', label: 'Completed', color: '#4caf50' },
]

export default function EditTaskForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === id)
  )

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'pending')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [newTask, setNewTask] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!task) setNewTask(true);
  }, [task, navigate])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = STATUS_OPTIONS.find(o => o.value === status)!

  function handleUpdate() {
    if (!title.trim() || !id) return
    dispatch(updateTask({ id, title: title.trim(), description: description.trim(), status }))
    navigate('/')
  }

  return (
    <div className="task-form-page">
      <input
        className="form-input"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="form-textarea"
        placeholder="Enter the description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
      />

      {!newTask ?
        <div className="status-dropdown" ref={dropdownRef}>
          <button
            className="status-dropdown-trigger"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <span className="status-dot" style={{ backgroundColor: selected.color }} />
            <span>{selected.label}</span>
            {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {dropdownOpen && (
            <div className="status-dropdown-menu">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`status-dropdown-item${opt.value === status ? ' active' : ''}`}
                  onClick={() => { setStatus(opt.value); setDropdownOpen(false) }}
                >
                  <span className="status-dot" style={{ backgroundColor: opt.color }} />
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div> : null}
      <div className="form-actions">
        <button className="secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
        <button className="primary" onClick={handleUpdate} disabled={!title.trim()}>
          Update
        </button>
      </div>
    </div>
  )
}
