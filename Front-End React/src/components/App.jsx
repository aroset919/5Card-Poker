import React from 'react';
import '../../public/styles/App.css';
import GameManager from "./BehaviorManager.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

//App component holds the different parts of the website whole and initializes a new deck to be used.
function App() {
  return (
    <div>
      <Header />
      <GameManager />
      <Footer />
    </div>
    );
}

export default App;