import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import SignUp from './signup';
import JedanSmjer from './jedansmjer';
import Povratno from './povratno';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Default route renders Login.jsx */}
          <Route path="/" element={<Login />} />
          {/* Home route renders Home.jsx */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
