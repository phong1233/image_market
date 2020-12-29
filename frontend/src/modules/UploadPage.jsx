import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';



const useStyles = makeStyles({
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px'
  },
  card: {
    margin: '40px',
    height: '300px',
  },
  text: {
    width: '100%'
  }
});

export default function UploadPage() {
  const classes = useStyles();
  const [name, setName] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [link, setLink] = useState(undefined);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(undefined);

  const verifyInput = () => {
    let regName = /^\w+$/gm;
    let floatPrice = parseFloat(price);
    setButtonDisabled(!regName.test(name) || description === undefined || description === "" || description === null || isNaN(floatPrice) || link === undefined || link === "" || link === null);
  }

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    verifyInput();
  }

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
    verifyInput();
  }

  const handlePriceChange = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
    verifyInput();
  }

  const handleLinkChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
    verifyInput();
  }

  const handleClose = () => {
    setNotify(false);
  }

  const uploadImage = () => {
    console.log("uploaded");
    fetch('http://localhost:5000/image/', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "name": name,
       "description": description,
       "price": parseFloat(price),
       "image": link
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setName(undefined);
        setPrice(undefined);
        setDescription(undefined);
        setLink(undefined);
        setButtonDisabled(true);
        setMessage(result.responseMessage);
        setNotify(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return(
    <div>
      <Typography className={classes.title} variant='h3'>
        Upload Page
      </Typography>
      <Card className={classes.card}>
        <CardHeader
          title="Upload single image"
        />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField className={classes.text} label="Name" variant="outlined" onChange={handleNameChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField className={classes.text} label="Description" variant="outlined" onChange={handleDescriptionChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField className={classes.text} label="Price" variant="outlined" onChange={handlePriceChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField className={classes.text} label="Image Link" variant="outlined" onChange={handleLinkChange} />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={uploadImage}>
                Upload
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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