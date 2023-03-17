import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { Routes,Route } from 'react-router-dom';
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="App">
      <header className='container'>
        <h1>ToDo List</h1>
      </header>
      <div>
        <Routes>
        <Route path='/' element={   <HomePage />} />
        <Route path='/edit/:id' element={   <EditTask />} /> 
        </Routes> 
      
      </div>
    </div>
  );
}

export default App;
