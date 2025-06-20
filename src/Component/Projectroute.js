import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from '../App';
import Content from './Content';
import Game from './Game';
  

function Projectroute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Content />} />
            <Route path="/game" element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Projectroute;
