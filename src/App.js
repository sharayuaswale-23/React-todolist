import './App.css';
import TodoList from './components/Todolist';
import Home from './components/home/home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/todolist' element = {<TodoList/>}></Route>
      <Route path='/home' element = {<Home/>}></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path='/' element = {<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
