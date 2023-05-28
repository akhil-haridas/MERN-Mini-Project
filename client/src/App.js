import React,{lazy,Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './Routes/User';

import './App.css';

function App() {
  
  const Admin =lazy(()=>import('./Routes/Admin'))

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/*" element={<User />} />
          </Routes>
          <Suspense fallback={<h1 className="al">loding.....</h1>}>
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;


