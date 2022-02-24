import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Grid } from './elements';
import Main from './page/Main';
import PostDetail from './page/PostDetail';
import PostWrite from './page/PostWrite';
import ThumbNail from './page/ThumbNail';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from './redux/modules/user';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';

function App() {

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  React.useEffect(()=>{
    if(token){
      dispatch(userActions.loginCheckDB());
    }
  },[])
  return (
    <>
      <ConnectedRouter history={history}>
        <Grid bgc='#f8f9fa'>
          <Route exact path='/'  component={Main}/>
          <Route exact path="/T" component={ThumbNail} />
          <Route exact path="/PostWrite" component={PostWrite}/>
          <Route exact path="/PostWrite/:postId" component={PostWrite}/>
        </Grid>
        <Grid bgc='#fff'>
          <Route exact path="/PostDetail/:postId" component={PostDetail}/>
        </Grid>
      </ConnectedRouter>
    </>
  );
}

export default App;
