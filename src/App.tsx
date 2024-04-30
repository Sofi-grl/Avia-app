import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />} />
  </Routes>
  );
}

export default App;
