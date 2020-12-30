import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TransactionTable from './transactions/TransactionTable';


const useStyles = makeStyles({
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  subtitle: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '80px'
  }
});

export default function StorePage() {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/transaction/`)
    .then(res => res.json())
    .then(
      (result) => {
        setTransactions(result);
        const totals = result.map((res) => res.total);
        setTotal(totals.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue)).toFixed(2));
      }
    )
  }, []);

  return(
    <div>
      <Typography className={classes.title} variant='h3'>
        Transaction History
      </Typography>
      <TransactionTable transactions={transactions}></TransactionTable>
      <Typography className={classes.subtitle} variant='h5'>
        {`Total revenue: ${total}$`}
      </Typography>
    </div>
  );
}
