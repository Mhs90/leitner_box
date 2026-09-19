import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import LeitnerBoxPage from './Pages/LeitnerBoxPage';
import OverviewPage from './Pages/OverviewPage';
import ChangeProfilePage from './Pages/ChangeProfilePage';
import BoxPage from './Pages/BoxPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LeitnerBoxPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/overview' element={<OverviewPage />} />
      <Route path='/profile' element={<ChangeProfilePage />} />
      <Route path='/box/:num' element={<BoxPage />} />
    </Routes>
  );
}

export default App;