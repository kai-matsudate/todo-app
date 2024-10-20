'use client'

import { useState, useEffect } from 'react'
import {Cell, Column, Row, Table, TableBody, TableHeader} from 'react-aria-components';
import Button from '@/components/Button/Button'

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function HomePage() {
  // todos を useState<Todo[]> で初期化
  // 初期値をからの配列で初期化している
  const [todos, setTodos] = useState<Todo[]>([])

  // ダミーデータを追加
  // setTodos 関数を使って、todos に新しいデータを追加
  useEffect(() => {
    setTodos([
      { id: 1, text: "Learn React", completed: false },
      { id: 2, text: "Learn Next.js", completed: false },
      { id: 3, text: "Build a project", completed: false },
    ])
  }, [])

  return (
    // 外枠
    <div className="min-h-screen flex item-center justify-center">
      <Table className="w-full max-w-3xl mx-auto">
        <TableHeader>
          <Row>
            <Column className="w-1/2" isRowHeader>Todo</Column>
            <Column className="w-1/4">Status</Column>
            <Column className="w-1/4">Actions</Column>
          </Row>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <Row key={todo.id}>
              <Column className="w-1/2">{todo.text}</Column>
              <Column className="w-1/4">{todo.completed ? "Completed" : "In progress"}</Column>
              <Column className="w-1/4">
                <Button color="primary" size="small">Edit</Button>
                <Button color="error" size="small">Delete</Button>
              </Column>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
