import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/store'

export default function AddTaskForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleAdd() {
    if (!title.trim()) return
    dispatch(addTask({ title: title.trim(), description: description.trim() }))
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
      <div className="form-actions">
        <button className="secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
        <button className="primary" onClick={handleAdd} disabled={!title.trim()}>
          ADD
        </button>
      </div>
    </div>
  )
}
