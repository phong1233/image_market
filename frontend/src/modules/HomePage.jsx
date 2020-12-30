import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    paddingRight: '20px',
    paddingLeft: '20px',
    textAlign: 'center'
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px'
  },
  card: {
    width: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px'
  }
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant='h3'>
        Image Market
      </Typography>
      <Typography className={classes.title} variant='body1'>
        Welcome to Image Market, a web application used for buying and selling images!        
      </Typography>
      <Typography className={classes.title} variant='body1'>
        Add any images you want to the image repository       
      </Typography>
      <Typography className={classes.title} variant='body1'>
        Edit the price, description and discount of each image      
      </Typography>
      <Typography className={classes.title} variant='body1'>
        Users are able to purchase images       
      </Typography>
      <Typography className={classes.title} variant='body1'>
        The transaction history can be viewed at any time 
      </Typography>

      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Typography>
              <Link href="https://github.com/phong1233" color="secondary">
                By: Phong Le
              </Link>
            </Typography>
            <Typography>
              <Link href="https://github.com/phong1233/image_market" color="secondary">
                Source code
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}