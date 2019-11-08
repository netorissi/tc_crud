import React, { useState } from 'react';
import { Grid, Table, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import { numberToReal, removeAccents } from '../helpers/formatters';

export default ({ vehicles, searchParam, editRegister }) => {
	const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
    }
    
    function searchingInput(searchParam) {

        const filter1 = removeAccents(searchParam).toLowerCase();
    
        return function(vehicles) {
            const title = vehicles.title
                ? removeAccents(vehicles.title).toLowerCase()
                : "";
            const model = vehicles.model
                ? removeAccents(vehicles.model).toLowerCase()
                : "";
            const brand = vehicles.brand
                ? removeAccents(vehicles.brand).toLowerCase()
                : "";
            
            return (
                title.includes(filter1) ||
                model.includes(filter1) ||
                brand.includes(filter1) ||
                !searchParam
            );
        };
    }
    
    return (
        <Grid container style={{ padding: 40 }}>
            <Grid item xs={12} className="pd-20">
                <Table>
                    <TableBody>
                        {vehicles.length > 0 &&
                        vehicles
                        .filter(searchingInput(searchParam))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(item => (
                            <TableRow
                            hover
                            key={item.id}
                            onClick={() => editRegister(item)}
                            >
                                <TableCell style={{ color: '#fff', fontSize: 20, padding: 20 }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <strong>{item.title}</strong>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {`${item.model} • ${item.brand} • ${item.km} KM`}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell style={{ color: '#fff', fontSize: 20, padding: 20 }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <strong>{`R$ ${numberToReal(parseFloat(item.price).toFixed(2))}`}</strong>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {item.year}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                        {vehicles.length === 0 && (
                            <TableRow>
                                <TableCell 
                                style={{ 
                                    color: '#fff',
                                    fontSize: 20,
                                    padding: 20,
                                    borderBottom: 'none'
                                }}
                                >
                                    <strong>Nenhum resultado encontrado ...</strong>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    style={{ margin: 30, color: '#fff', fontSize: 20 }}
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={vehicles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelDisplayedRows={() => "Página: " + (page+1)}
                    backIconButtonProps={{
                        'aria-label': 'Próxima',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Anterior',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    )
}