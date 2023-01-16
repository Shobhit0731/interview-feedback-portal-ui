import React from 'react';
import './App.css';
import Header from "./Header";
import SignInOutContainer from './containers/HomePage';
function App() {
  return (
    <div className="App">
      <Header/>
     <SignInOutContainer/>
    </div>
  );
}

export default App;