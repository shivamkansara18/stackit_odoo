import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/ask">Ask</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
