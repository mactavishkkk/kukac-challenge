import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Expense from './pages/Expenses';
import Navbar from './components/Navbar';
import './App.css';
import Rent from './pages/Rent';
import EditUser from './pages/EditUser';
import EditExpense from './pages/EditExpense';
import EditRent from './pages/EditRent';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-user" element={<EditUser />} />

          <Route path="/expenses" element={<Expense />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />

          <Route path="/rents" element={<Rent />} />
          <Route path="/edit-rent/:id" element={<EditRent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
