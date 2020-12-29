import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

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

export default function ImagePage() {
  const classes = useStyles();
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(undefined);

  const handleClose = () => {
    setNotify(false);
  }

  return(
    <div>
      <Typography className={classes.title} variant='h3'>
        Images
      </Typography>
      <ImageList></ImageList>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notify}
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
      />
    </div>
  );
}

const mockImage = {
    description: "golden",
    discount: 0.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Labrador_on_Quantock_%282175262184%29.jpg",
    name: "labrador",
    price: 9.99
}