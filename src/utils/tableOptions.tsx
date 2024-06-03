import { Typography } from '@mui/material'

export const dataTableOptions = {
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    selectableRows: 'none',
    print: false,
    download: true,
    filterType: 'dropdown',
    search: true,
}

export const customTableOptions = {
    empty: true,
    customHeadRender: (column: any) => (
        <th>
            <Typography className="custom-header-container" variant="h6">
                {column.label}
            </Typography>
        </th>
    ),
}
