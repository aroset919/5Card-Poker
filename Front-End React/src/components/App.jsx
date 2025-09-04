import React, {useEffect} from 'react'
import '../../public/styles/App.css'
import CurrHand from "./HandSubmit.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import axios from "axios"

const SERVER_PATH = "http://localhost:3000/init-data";

function App() {
  var resData;
  const fetchAPI = async () =>{
    const response = await axios.get(SERVER_PATH);
    resData=response.data.drawncards;
    console.log(resData);
  }

  useEffect(() =>{
    fetchAPI();
  }, []);

  return (
    <div>
      <Header />
      <CurrHand />
      <Footer />
    </div>
    );
}

export default App;