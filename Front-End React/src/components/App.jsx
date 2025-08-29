import { useState } from 'react'
import reactLogo from '../../public/assets/react.svg'
import viteLogo from '../../public/assets/vite.svg'
import '../../public/styles/App.css'
import PokerHand from "./PokerHand.jsx"

/** var cardColl = [
    {
      index: "0",
      image: "https://img.pixers.pics/pho_wat(s3:700/FO/54/86/98/31/700_FO54869831_6577459d8a01672615ca344481beace8.jpg,518,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,298,650,jpg)/wall-murals-playing-card-king-of-club.jpg.jpg",
      value: "King",
      suit: "Club"
    },
    {
      index: "1",
      image: "https://tattoosandscarssaloon.com/cdn/shop/products/b6eaeca7e466f2767ad763451deab923_2000x.jpg?v=1662575692",
      value: "Ace",
      suit: "Spade"
    },
    {
      index: "2",
      image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/blank-playing-card-queen-spades-bigalbaloo-stock.jpg",
      value: "Queen",
      suit: "Spade"
    },
    {
      index: "3",
      image: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/436/2D__57497__49826.1681470474.jpg?c=1",
      value: "Two",
      suit: "Diamond"
    },
    {
      index: "4",
      image: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/438/9D__67286__64203.1681313264.jpg?c=1",
      value: "Nine",
      suit: "Diamond"
    }
  ]
  */


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <PokerHand/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
