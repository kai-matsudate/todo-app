import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface tableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export default function Table( { columns, rows }: tableProps) {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
