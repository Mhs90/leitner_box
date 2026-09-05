import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LeitnerBoxPage from './Pages/LeitnerBoxPage';
import OverviewPage from './Pages/OverviewPage';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/' element={<LeitnerBoxPage />} />
      <Route path='/overview' element={<OverviewPage />} />
    </Routes>
  );
}

export default App;