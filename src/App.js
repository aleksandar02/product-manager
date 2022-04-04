import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Homepage';
import AddProductPage from './pages/AddProductPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-product' element={<AddProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
