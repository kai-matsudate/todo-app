import React from 'react';
import { GridColDef, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';

// アイコンをクリックしたときの処理
const toggleRowMode = (params: GridRowParams) => (event: React.MouseEvent) => {

};

// 表示するアクションを返す関数
const getDetailAction = (params: GridRowParams) => [
  <GridActionsCellItem
    key={params.id}
    icon={<SvgIcon component={EditIcon} />} // アイコンを表示
    label="編集"
    onClick={toggleRowMode(params)}
    color="inherit"
  />
];

export const TodoColumns: GridColDef[] = [
  { field: "title", headerName: "Title", editable: true, width: 150 },
  { field: "completed", headerName: "Completed", editable: true, width: 150 },
  { field: "createdAt", headerName: "Created At", width: 110 },
  { field: "dueOn", headerName: "Due On", editable: true, width: 160 },
  {
    field: 'detailAction',
    headerName: '',
    align: 'left',
    width: 60,
    type: 'actions',
    getActions: (params: GridRowParams) => getDetailAction(params),  // アクションを取得
  },
];

