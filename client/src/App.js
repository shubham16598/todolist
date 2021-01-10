import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppNavbar from './components/AppNavbar'
import Todolist from './components/Todo_list'
import {Container} from 'reactstrap'
import ItemModal from './components/ItemModal';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
 
      <Router>
        <div className="App">
   
                <AppNavbar/>
                <Container>                 
                  <ItemModal/>
                  <Todolist/>
                </Container>                
        </div>     
      </Router>    
  );
}

export default App;
