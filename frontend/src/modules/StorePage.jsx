import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ImageList from './images/ImageList';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  }
});

export default function StorePage() {
  const classes = useStyles();

  return(
    <div>
      <Typography className={classes.title} variant='h3'>
        Store
      </Typography>
      <ImageList buying></ImageList>
    </div>
  );
}
