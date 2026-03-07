import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Search, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { RootState } from '../store/store'
import type { Task } from '../types/task'
import TaskItem from './TaskItem'

const SECTION_ORDER: Task['status'][] = ['in_progress', 'pending', 'completed']
const SECTION_LABELS: Record<Task['status'], string> = {
  in_progress: 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
}

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState<Record<Task['status'], boolean>>({
    in_progress: false,
    pending: false,
    completed: false,
  })

  const filtered = search.trim()
    ? tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    : tasks

  const grouped = SECTION_ORDER.reduce<Record<Task['status'], Task[]>>(
    (acc, status) => {
      acc[status] = filtered.filter(t => t.status === status)
      return acc
    },
    { in_progress: [], pending: [], completed: [] }
  )

  function toggleSection(status: Task['status']) {
    setCollapsed(prev => ({ ...prev, [status]: !prev[status] }))
  }

  return (
    <div className="task-list-page">
      <div className="search-bar">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {SECTION_ORDER.map(status => {
        const items = grouped[status]
        if (items.length === 0) return null
        const isCollapsed = collapsed[status]

        return (
          <div key={status} className="status-section">
            <button
              className="section-header"
              onClick={() => toggleSection(status)}
            >
              <span>
                {SECTION_LABELS[status]} ({items.length})
              </span>
              {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>

            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <AnimatePresence>
                    {items.map(task => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {tasks.length === 0 && (
        <div className="empty-state">
          <ClipboardList size={48} className="empty-state-icon" />
          <span>Add some tasks to get started</span>
        </div>
      )}

      {tasks.length > 0 && filtered.length === 0 && (
        <div className="empty-state">
          <span>No tasks found.</span>
        </div>
      )}
    </div>
  )
}
