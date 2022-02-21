import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Grid } from './elements';
import Main from './page/Main';

function App() {
  return (
    <>
      <Grid bgc='#f8f9fa'>
        <BrowserRouter>
          <Route path='/' exact component={Main}/>
        </BrowserRouter>
      </Grid>
    </>
  );
}

export default App;
