import { BrowserRouter, Route, Routes } from 'react-router-dom';

import New from './pages/finances/operations/New';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/finances/operations/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
