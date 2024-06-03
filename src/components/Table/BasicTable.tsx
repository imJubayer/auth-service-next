import React from 'react'
import Table from '@mui/joy/Table'
import Sheet from '@mui/joy/Sheet'
import { Typography } from '@mui/joy'

interface Column {
    id: string
    label: string
    width?: string
}

interface DataItem {
    name: string
    calories: number
    fat: number
    carbs: number
    protein: number
}

interface BasicTableProps {
    columns: Column[]
    data: DataItem[]
}

const BasicTable: React.FC<BasicTableProps> = ({ columns, data }) => {
    return (
        <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm' }}>
            <Table
                stripe="odd"
                hoverRow
                sx={{
                    captionSide: 'top',
                    '& tbody': { bgcolor: 'background.surface' },
                }}>
                <caption>Nutrition of your favorite menus.</caption>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.id} style={{ width: column.width }}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.name}>
                            {columns.map(column => (
                                <td key={column.id}>
                                    {column.id === 'name' ? (
                                        row[column.id]
                                    ) : (
                                        <Typography level="h2">
                                            {row[column.id]}
                                        </Typography>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default BasicTable
