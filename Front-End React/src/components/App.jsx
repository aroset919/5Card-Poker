import React from 'react'
import '../../public/styles/App.css'
import PokerHand from "./PokerHand.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"

function App() {
  return (
    <div>
      <Header />
      <PokerHand/>
      <Footer />
    </div>
    );
}

export default App;
