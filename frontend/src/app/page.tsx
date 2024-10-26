'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridRowParams,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowId,
} from '@mui/x-data-grid'
import { jaJP } from '@mui/material/locale';
import { TextField, Button, ThemeProvider, createTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid'; // UUIDを使用

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  const [rowModeModel, setRowModeModel] = useState<GridRowModesModel>({});

  // ダミーデータを追加（APIの代わりに使用）
  useEffect(() => {
    async function fetchData() {
      setTodos([
        { id: uuidv4(), title: "Learn React", completed: false, createdAt: new Date(), dueOn: new Date() },
        { id: uuidv4(), title: "Learn Next.js", completed: false, createdAt: new Date(), dueOn: new Date() },
        { id: uuidv4(), title: "Build a project", completed: false, createdAt: new Date(), dueOn: new Date() },
      ]);
    }
    fetchData();
  }, []);

  const addTodo = () => {
    if(newTodoTitle === '') return

    const newTodo: Todo = {
      id: uuidv4(),
      title: newTodoTitle,
      completed: false,
      createdAt: new Date(),
      dueOn: new Date()
    }
    setTodos([...todos, newTodo])
    setNewTodoTitle('')
  }

  function ToolBar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    )
  }

  // 編集モードに入る
  const toggleRowModeEdit = (params: GridRowParams) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const id = params.id;

    // 状態を効率的に更新
    setRowModeModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  // 閲覧モードに入る
  const toggleRowModeView = (params: GridRowParams) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const id = params.id;

    setRowModeModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const deleteTodo = (id: GridRowId) => () => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  };

  const updateTodo = (updatedRow: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedRow.id ? updatedRow : todo))
    );
    return updatedRow;
  };

  // アイコンをクリックしたときの処理
  const saveTodo = (params: GridRowParams) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const id = params.id;

    // 行を保存してモードを View に切り替える
    const updatedRow = todos.find((todo) => todo.id === id);
    if (updatedRow) {
      updateTodo(updatedRow); // 行のデータを更新
    }

    setRowModeModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  // 表示するアクションを返す関数
  const getDetailAction = (params: GridRowParams) => {
    if(rowModeModel[params.id]?.mode !== GridRowModes.Edit) {
      return [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />} // 直接アイコンを使用
          label="編集"
          onClick={toggleRowModeEdit(params)}
          color="success"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />} // 直接アイコンを使用
          label="削除"
          onClick={deleteTodo(params.id)}
          color="error"
        />,
      ]
    } else {
      return [
        <GridActionsCellItem
          key={params.id}
          icon={<SaveIcon />} // 直接アイコンを使用
          label="保存"
          onClick={saveTodo(params)}
          color="success"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<HighlightOffIcon />} // 直接アイコンを使用
          label="キャンセル"
          onClick={toggleRowModeView(params)}
          color="error"
        />
      ]
    }
  }

  const TodoColumns: GridColDef[] = [
    { field: "title", type: 'string', headerName: "Title", editable: true, width: 150 },
    { field: "completed", type: 'boolean', headerName: "Completed", editable: true, width: 150 },
    { field: "createdAt", type: 'dateTime', headerName: "Created At", width: 110 },
    { field: "dueOn", type: 'date', headerName: "Due On", editable: true, width: 160 },
    {
      field: 'detailAction',
      headerName: '操作',
      width: 100,
      type: 'actions',
      getActions: (params: GridRowParams) => getDetailAction(params),
    },
  ];

  const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
      },
    },
    jaJP,
  );

  return (
    // 外枠
    <div className="flex flex-col item-center justify-center gap-4">
      <div className="flex gap-4">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className='flex-grow'
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Add
        </Button>
      </div>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={todos}
          columns={TodoColumns}
          pageSize={5}
          editMode='row'
          rowModesModel={rowModeModel}
          onRowModesModelChange={(newModel) => setRowModeModel(newModel)}
          processRowUpdate={updateTodo}
          slots={{
            toolbar: ToolBar,
          }}
          onCellDoubleClick={(_, event) => {
            event.defaultMuiPrevented = true;
          }}
          onCellKeyDown={(_, event) => {
            event.defaultMuiPrevented = true;
          }}
        />
      </ThemeProvider>
    </div>
  )
}
