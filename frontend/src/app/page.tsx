'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'
import { TodoColumns } from '@/lib/todo_columns'
import {
  DataGrid,
  GridToolbar,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumns,
  GridRowParams,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
} from '@mui/x-data-grid'
import { jaJP } from '@mui/material/locale';
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  // 行モードのモデル
  const [rowModeModel, setRowModeModel] = useState<GridRowModesModel>({});

  // ダミーデータを追加
  useEffect(() => {
    setTodos([
      { id: 1, title: "Learn React", completed: false, createdAt: new Date(), dueOn: new Date() },
      { id: 2, title: "Learn Next.js", completed: false, createdAt: new Date(), dueOn: new Date() },
      { id: 3, title: "Build a project", completed: false, createdAt: new Date(), dueOn: new Date() },
    ])
  }, [])

  const addTodo = () => {
    if(newTodoTitle === '') return

    const newTodo: Todo = {
      id: todos.length + 1,
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

  // アイコンをクリックしたときの処理
  const toggleRowModeEdit = (params: GridRowParams) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const id = params.id;

    // 行モードを切り替える
    setRowModeModel({
      // スプレッド構文で既存の行モードを展開
      ...rowModeModel,
      [id]: {
        // 指定の行のモードを編集モードに変更
        mode: GridRowModes.Edit,
      }
    }
    )
  };

  // アイコンをクリックしたときの処理
  const toggleRowModeView = (params: GridRowParams) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const id = params.id;

    // 行モードを切り替える
    setRowModeModel({
      // スプレッド構文で既存の行モードを展開
      ...rowModeModel,
      [id]: {
        // 指定の行のモードを編集モードに変更
        mode: GridRowModes.View,
      }
    }
    )
  };

  const deleteTodo = (id: number) => () => {
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

    // 行モードを View に切り替える
    setRowModeModel((prevModel) => ({
      ...prevModel,
      [id]: {
        mode: GridRowModes.View,
      },
    }));
  };
  // 表示するアクションを返す関数
  const getDetailAction = (params: GridRowParams) => {
    if(rowModeModel[params.id]?.mode !== GridRowModes.Edit) {
      return [
        <GridActionsCellItem
          key={params.id}
          icon={<SvgIcon component={EditIcon} />} // アイコンを表示
          label="編集"
          onClick={toggleRowModeEdit(params)}
          color="success"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<SvgIcon component={DeleteIcon} />} // アイコンを表示
          label="削除"
          onClick={deleteTodo(params.id)}
          color="error"
        />,
      ]
    } else {
      return [
        <GridActionsCellItem
          key={params.id}
          icon={<SvgIcon component={SaveIcon} />} // アイコンを表示
          label="保存"
          onClick={saveTodo(params)}
          color="success"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<SvgIcon component={HighlightOffIcon} />} // アイコンを表示
          label="キャンセル"
          onClick={toggleRowModeView(params)}
          color="error"
        />
      ]
    }
  }

  const TodoColumns: GridColDef[] = [
    { field: "title", headerName: "Title", editable: true, width: 150 },
    { field: "completed", headerName: "Completed", editable: true, width: 150 },
    { field: "createdAt", headerName: "Created At", width: 110 },
    { field: "dueOn", headerName: "Due On", editable: true, width: 160 },
    {
      field: 'detailAction',
      headerName: '操作',
      width: 100,
      type: 'actions',
      getActions: (params: GridRowParams) => getDetailAction(params),  // アクションを取得
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
      <div
        className="flex gap-4"
      >
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
          onClick={() => addTodo()}
        >
          Add
        </Button>
      </div>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={todos}
          columns={TodoColumns}
          color="primary"
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
