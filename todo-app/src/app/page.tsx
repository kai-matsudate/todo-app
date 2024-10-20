'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'
import { Button } from "../components/Button"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      ))
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">TODO App</h1>
        
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="新しいタスクを入力"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-grow mr-2"
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            追加
          </Button>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            すべて
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            未完了
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            完了済み
          </Button>
        </div>

        {filteredTodos.map(todo => (
          <Card key={todo.id} className="mb-2">
            <CardContent className="p-4 flex items-center">
              {editingId === todo.id ? (
                <>
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button size="icon" onClick={saveEdit} className="mr-2">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={cancelEdit} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <span className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.text}
                  </span>
                  <Button size="icon" onClick={() => startEditing(todo.id, todo.text)} className="mr-2">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={() => deleteTodo(todo.id)} variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
