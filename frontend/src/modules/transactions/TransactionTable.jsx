import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  tableContainer: {
    maxWidth: 700
  },
  table: {
    maxWidth: 700
  },
});

export default function TransactionTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image Name</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Discount (%)</TableCell>
              <TableCell align="right">Total ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price.toFixed(2)}</TableCell>
                <TableCell align="right">{row.discount.toFixed(2)*100}</TableCell>
                <TableCell align="right">{row.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}