import React from 'react'
import {
    Grid,
    Table,
    Typography,
    Select,
    Sheet,
    Box,
    FormControl,
    FormLabel,
    Option,
} from '@mui/joy'
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import FilterListIcon from '@mui/icons-material/FilterList'
// project imports

import { checkNullInfo, checkDecimal } from '@/utils/helper'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { ColumnType } from '@/types/common'

// Props type

type TableProps = {
    loading?: boolean
    columns: ColumnType[]
    rows: any[]
    count?: number
    page?: number
    rowsPerPage?: number
    link?: string
    linkID?: string
    idField?: string
    statusField?: string
    showSL?: boolean
    sortables?: string[]
    setPage?: (value: number) => void
    setRowsPerPage?: (value: number) => void
    updateStatus?: (id: string) => void
    updateRows?: (data: any[]) => void
    serverSide?: boolean
}

// ==============================|| TABLE - BASIC ||============================== //

const BasicDataTable = ({
    loading,
    columns,
    rows,
    count,
    page,
    rowsPerPage,
    link,
    linkID,
    showSL,
    sortables,
    idField,
    statusField,
    setPage,
    setRowsPerPage,
    updateStatus,
    updateRows,
    serverSide = false,
}: TableProps) => {
    const router = useRouter()

    const handleChangePage = (newPage: number) => {
        if (setPage) {
            setPage(newPage)
        }
    }

    const slicedRows = (rows: any) => {
        if (!serverSide) {
            return rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            )
        }
        return rows
    }

    function labelDisplayedRows({
        from,
        to,
        count,
    }: {
        from: number
        to: number
        count: number
    }) {
        return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
    }

    const getLabelDisplayedRowsTo = () => {
        console.log(page, rowsPerPage)
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage
        }
        return rowsPerPage === -1
            ? count
            : Math.min(count, (page + 1) * rowsPerPage)
    }

    const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10))
        setPage(0)
    }

    const renderCell = (item: any, column: any) => {
        if (column.content) {
            return column.content(item)
        }
        return (
            <Typography noWrap>
                {checkNullInfo(checkDecimal(item[column.accessor]))}
            </Typography>
        )
    }

    const sortByColumn = (columnKey: string) => {
        const allRows = [...rows]
        if (updateRows) {
            const sorted = _.sortBy(allRows, [
                // eslint-disable-next-line func-names
                function (o) {
                    return o[columnKey]
                },
            ])
            updateRows(sorted)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Sheet
                    variant="outlined"
                    sx={{ margin: '2px', borderRadius: 'sm' }}>
                    <Table
                        aria-label="simple table"
                        hoverRow
                        stickyHeader
                        sx={{
                            '--TableCell-headBackground':
                                'var(--joy-palette-background-level1)',
                            '--Table-headerUnderlineThickness': '1px',
                            '--TableRow-hoverBackground':
                                'var(--joy-palette-background-level1)',
                            '--TableCell-paddingY': '4px',
                            '--TableCell-paddingX': '8px',
                        }}>
                        <thead>
                            <tr>
                                {showSL && (
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '50px',
                                        }}>
                                        Sl
                                    </th>
                                )}
                                {columns.map(
                                    (column: ColumnType, index: number) =>
                                        sortables &&
                                        sortables.includes(column.accessor) ? (
                                            <th
                                                key={index}
                                                style={{
                                                    textAlign: 'center',
                                                    width:
                                                        `${column.width}` ||
                                                        'auto',
                                                }}
                                                onClick={() =>
                                                    sortByColumn(
                                                        column.accessor,
                                                    )
                                                }>
                                                {column.header}{' '}
                                                <FilterListIcon />
                                            </th>
                                        ) : (
                                            <th
                                                style={{
                                                    textAlign: 'center',
                                                    width:
                                                        `${column.width}` ||
                                                        'auto',
                                                }}
                                                key={index}>
                                                {column.header}
                                            </th>
                                        ),
                                )}
                                {statusField && idField && updateStatus && (
                                    <th>Update Status</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length ? (
                                slicedRows(rows)
                                    // .slice(
                                    //     page * rowsPerPage,
                                    //     page * rowsPerPage + rowsPerPage,
                                    // )
                                    .map((row: any, i: number) => (
                                        <tr
                                            key={i}
                                            className={''} // Add your custom class for row hover
                                            onClick={() =>
                                                linkID
                                                    ? router.push(
                                                          `${
                                                              link + row[linkID]
                                                          }/`,
                                                      )
                                                    : ''
                                            }
                                            style={{
                                                textAlign: 'center',
                                                cursor: linkID
                                                    ? 'pointer'
                                                    : 'default',
                                            }}>
                                            {showSL && (
                                                <td>
                                                    {rowsPerPage && page
                                                        ? page * rowsPerPage +
                                                          i +
                                                          1
                                                        : i + 1}
                                                </td>
                                            )}
                                            {columns.map(
                                                (
                                                    column: ColumnType,
                                                    k: number,
                                                ) => (
                                                    <td key={k}>
                                                        {renderCell(
                                                            row,
                                                            column,
                                                        )}
                                                    </td>
                                                ),
                                            )}
                                            {statusField &&
                                                idField &&
                                                updateStatus && (
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    row[
                                                                        idField
                                                                    ],
                                                                )
                                                            }
                                                            className={`btn ${
                                                                row[statusField]
                                                                    ? 'btn-success'
                                                                    : 'btn-primary'
                                                            } btn-sm`}>
                                                            {row[statusField]
                                                                ? 'Cancel Approval'
                                                                : 'Approve'}
                                                        </button>
                                                    </td>
                                                )}
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={
                                            showSL
                                                ? columns.length + 1
                                                : columns.length
                                        }
                                        style={{ textAlign: 'center' }}>
                                        {loading ? (
                                            <h3>Loading...</h3>
                                        ) : (
                                            <h3>No Data Found</h3>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={columns.length + 1}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            justifyContent: 'flex-end',
                                        }}>
                                        <FormControl
                                            orientation="horizontal"
                                            size="sm">
                                            <FormLabel>
                                                Rows per page:
                                            </FormLabel>
                                            <Select
                                                onChange={
                                                    handleChangeRowsPerPage
                                                }
                                                value={rowsPerPage}>
                                                <Option value={5}>5</Option>
                                                <Option value={10}>10</Option>
                                                <Option value={25}>25</Option>
                                                <Option value={100}>100</Option>
                                            </Select>
                                        </FormControl>
                                        <Typography
                                            textAlign="center"
                                            sx={{ minWidth: 80 }}>
                                            {labelDisplayedRows({
                                                from:
                                                    rows.length === 0
                                                        ? 0
                                                        : page * rowsPerPage +
                                                          1,
                                                to: getLabelDisplayedRowsTo(),
                                                count:
                                                    rows.length === -1
                                                        ? -1
                                                        : count,
                                            })}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={page === 0}
                                                onClick={() =>
                                                    handleChangePage(page - 1)
                                                }
                                                sx={{
                                                    bgcolor:
                                                        'background.surface',
                                                }}>
                                                <KeyboardArrowLeftIcon />
                                            </IconButton>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={
                                                    rows.length !== -1
                                                        ? page >=
                                                          Math.ceil(
                                                              count /
                                                                  rowsPerPage,
                                                          ) -
                                                              1
                                                        : false
                                                }
                                                onClick={() =>
                                                    handleChangePage(page + 1)
                                                }
                                                sx={{
                                                    bgcolor:
                                                        'background.surface',
                                                }}>
                                                <KeyboardArrowRightIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
                {/* <Box
                    className="Pagination-laptopUp"
                    sx={{
                        pt: 2,
                        gap: 1,
                        [`& .${iconButtonClasses.root}`]: {
                            borderRadius: '50%',
                        },
                        display: {
                            xs: 'none',
                            md: 'flex',
                        },
                    }}>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        startDecorator={<KeyboardArrowLeftIcon />}>
                        Previous
                    </Button>

                    <Box sx={{ flex: 1 }} />
                    {['1', '2', '3', '…', '8', '9', '10'].map(page => (
                        <IconButton
                            key={page}
                            size="sm"
                            variant={Number(page) ? 'outlined' : 'plain'}
                            color="neutral">
                            {page}
                        </IconButton>
                    ))}
                    <Box sx={{ flex: 1 }} />

                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        endDecorator={<KeyboardArrowRightIcon />}>
                        Next
                    </Button>
                </Box> */}
                {/* {count && page !== undefined && rowsPerPage !== undefined && (
                    <div>
                        <span>{`Showing ${page * rowsPerPage + 1}-${Math.min(
                            (page + 1) * rowsPerPage,
                            count,
                        )} of ${count}`}</span>
                        <button
                            onClick={() => handleChangePage(page - 1)}
                            disabled={page === 0}
                            className="btn btn-secondary btn-sm">
                            Previous
                        </button>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            disabled={
                                page >= Math.ceil(count / rowsPerPage!) - 1
                            }
                            className="btn btn-secondary btn-sm">
                            Next
                        </button>
                        <Select
                            onChange={(event: any) => handleChangePage(event)}
                            value={rowsPerPage}>
                            {[5, 10, 25].map(perPage => (
                                <option key={perPage} value={perPage}>
                                    {perPage}
                                </option>
                            ))}
                        </Select>
                    </div>
                )} */}
            </Grid>
        </Grid>
    )
}

export default BasicDataTable
