import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import UploadPage from './UploadPage';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 999
  },
});

export default function Navigation() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState(undefined);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  useEffect(() => {
    let url =  require('url');
    let website = url.parse(window.location.href);
    let page = website.path.substr(1) ? website.path.substr(1) : 'home';
    setCurrentPage(page);
  }, []);

  return (
    <Router>
      <BottomNavigation value={currentPage} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction component={Link} to='/' label='Home' value='home' icon={<InfoIcon />} />
        <BottomNavigationAction component={Link} to='/images' label='Images' value='images' icon={<PhotoLibraryIcon />} />
        <BottomNavigationAction component={Link} to='/upload' label='Upload' value='upload' icon={<PublishIcon />} />
        <BottomNavigationAction component={Link} to='/buy' label='Buy' value='buy' icon={<ShoppingCartIcon />} />
      </BottomNavigation>
      <main>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/images' exact component={ImagePage}/>
          <Route path='/upload' exact component={UploadPage}/>
          <Route path='/buy' component={BuyingPage}/>
          <Route path='/' component={NotFound}/>
        </Switch>
      </main>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      HomePage
    </div>
  );
}

function ImagePage() {
  return (
    <div>
      ImagePage
    </div>
  );
}

function BuyingPage() {
  return (
    <div>
      UploadPage
    </div>
  );
}

function NotFound() {
  return (
    <div>
      Error 404 page not found
    </div>
    );
}
