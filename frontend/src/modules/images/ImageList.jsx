import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import ImageBox from './ImageBox';

const useStyles = makeStyles({
  container: {
    width: '100%',
    padding: '40px 40px 80px 40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function ImageList(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(undefined);

  const handleClose = () => {
    setNotify(false);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/image/`)
    .then(res => res.json())
    .then(
      (result) => {
        setImages(result);
      }
    )
  }, []);

  const handleDeleteImage = (name) => {
    fetch('http://localhost:5000/image/', {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "name": name
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setMessage(result.responseMessage);
        setNotify(true);
        fetch(`http://localhost:5000/image/`)
        .then(res => res.json())
        .then(
          (result) => {
            setImages(result);
          }
        )
      }
    )
  }

  return(
    <div className={classes.container}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-start'
        spacing={8}
      >
        {
          images.map((image) => {
            return(
              <Grid item key={image.name}>
                <ImageBox image={image} buying={props.buying} delete={handleDeleteImage}></ImageBox>
              </Grid>
            );
          })
        }
      </Grid>
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