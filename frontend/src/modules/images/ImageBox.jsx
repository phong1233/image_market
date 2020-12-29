import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    minWidth: 350,
    minHeight: 550,
    maxHeight: 550
  },
  media: {
    minHeight: 300,
    maxHeight: 300
  },
  content: {
    minHeight: 200,
    maxHeight: 200
  },
  action: {
    minHeight: 50,
    maxHeight: 50
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%'
  }
});

export default function ImageBox(props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(props.image.description);
  const [price, setPrice] = useState(props.image.price);
  const [discount, setDiscount] = useState(props.image.discount);
  const [disabled, setDisabled] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(undefined);

  const verifyInput = () => {
    let floatPrice = parseFloat(price);
    let floatDiscount = parseFloat(discount);
    setDisabled(description === undefined || description === "" || description === null || isNaN(floatPrice) || isNaN(floatDiscount));
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    verifyInput();
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    verifyInput();
  }

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
    verifyInput();
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleClose = () => {
    setNotify(false);
  }
  
  const handleSaveEdit = () => {
    fetch('http://localhost:5000/image/edit', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "name": props.image.name,
       "description": description,
       "price": parseFloat(price),
       "image": props.image.image,
       "discount": parseFloat(discount)
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setDisabled(false);
        setMessage(result.responseMessage);
        setNotify(true);
        handleEditMode();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return(
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.image.image}
          title={props.image.name}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.image.name}
          </Typography>
          { editMode ?
          <div>
            <TextField className={classes.text} value={description} label='Description' variant='outlined' size='small' onChange={handleDescriptionChange}/>
            <TextField className={classes.text} value={price} label='Price' variant='outlined' size='small' onChange={handlePriceChange}/>
            <TextField className={classes.text} value={discount} label='Discount' variant='outlined' size='small' onChange={handleDiscountChange}/>
          </div>
          :
          <div>
            <Typography variant='body1' color='textSecondary' component='p'>
              {description}
            </Typography>
            <Typography variant='body1' color='textSecondary' component='p'>
              {`Price: ${price}$`}
            </Typography>
            <Typography variant='body1' color='textSecondary' component='p'>
              {`Discount: ${discount}`}
            </Typography>
          </div>
          }
        </CardContent>
        { props.buying ? 
        <CardActions className={classes.action}>
          <Button size='small' variant='contained' color='secondary'>
            Buy
          </Button>
        </CardActions>
        :
        <CardActions className={classes.action}>
          { editMode ? 
            <Button size='small' variant='contained' color='primary' onClick={handleSaveEdit} disabled={disabled}>
              Save
            </Button>
            :
            <Button size='small' variant='contained' color='primary' onClick={handleEditMode}>
              Edit
            </Button>
          }
          <Button size='small' variant='contained' color='secondary' onClick={() => {props.delete(props.image.name)}}>
            Delete
          </Button>
        </CardActions>
        }
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
