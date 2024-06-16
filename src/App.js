import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Expense from './pages/Expenses';
import Navbar from './components/Navbar';
import './App.css';
import Rent from './pages/Rent';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/expenses" element={<Expense />} />
          <Route path="/rents" element={<Rent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
