/// <reference path="../mxtypings/index.d.ts" />

import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HelloWorld } from './helloWorld';
import { SchemaDesigner } from './schemaDesigner';


const HomePage = () => (
  <div>
    <h1>Examples</h1>
    <ul>
      <li><Link to="/helloWorld">Hello World</Link></li>
      <li><Link to="/schemaDesigner">Schema Designer</Link></li>
    </ul>
  </div>
);

export function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/helloWorld" element={<HelloWorld />} />
          <Route path="/schemaDesigner" element={<SchemaDesigner />} />
        </Routes>
      </Router>
    </>
  )
}