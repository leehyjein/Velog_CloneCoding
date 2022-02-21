import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Grid } from './elements';
import Main from './page/Main';
import PostDetail from './page/PostDetail';
import PostWrite from './page/PostWrite';

function App() {
  return (
    <>
      <Grid bgc='#f8f9fa'>
        <BrowserRouter>
          <Route path='/' exact component={Main}/>
          {/* <Route path="/" exact component={ThumbNail} /> */}
          <Route path="/PostWrite" component={PostWrite}/>
          <Route path="/PostDetail" component={PostDetail}/>
        </BrowserRouter>
      </Grid>
    </>
  );
}

export default App;
