import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LeitnerBoxPage from './Pages/LeitnerBoxPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/leitner' element={<LeitnerBoxPage/>} />
    </Routes>
  );
}

export default App;