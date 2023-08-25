import './Details.css';
import TopNav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import CardRater from '../../Components/CardRater/CardRater';
import PriceHistoryComponent from '../../Components/PriceHistory/PriceHistory';
import CardDescription from '../../Components/CardDescription/CardDescription'; 
import BackToResult from '../../Components/BackToResult/BackToResult';
import { useLocation, useParams } from 'react-router-dom';
import { PokemonCard } from '../../../../api/src/interfaces/cards.interface';
import { useEffect, useState } from 'react';
import { PriceHistory } from "../../../../api/src/interfaces/priceHistory.interface";



function Details() {
  // Dummy values to be passed as props. 
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] =  useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const location = useLocation();
  const receivedStatePokemonCard = location.state;

  // Grabs the args/params passed in through useNavigate's URL
  const params = useParams(); 

  /*
  'card' state variable is optional because we are already using the 
  receivedStatePokemonCard from the ProductCard component. 
  */
  const [card, setCard] = useState<PokemonCard>(); 
  const [priceHistory, setPriceHistory ] = useState<PriceHistory[]>([]); 

  /*
  Function to be called when new price history is posted. 
  Appends new price history entry to the price history array. 
  Then, React will automatically re-render the PriceHistoryComponent
  to include the new price history entry.
  */
  const handleNewPriceHistorySubmission = (newPriceHistorySubmission: PriceHistory) => {
    console.log("price history state before adding stuff in: ", priceHistory); 
    setPriceHistory(priceHistory => [newPriceHistorySubmission, ...priceHistory])
    console.log("price history state after adding stuff in: ", priceHistory); 
  }

  useEffect(() => {
    const fetchCurrentCard = async() => {
      try{
        const result = await fetch(`http://localhost:3000/cards/${params.id}?include=price-history`)
        const pokemonCardFetchedData = await result.json(); 
       
        setCard(pokemonCardFetchedData.data); 
        setPriceHistory(pokemonCardFetchedData.data.priceHistoryEntries); 
      }
      catch(error) {
        console.log(error); 
      }
    };
    fetchCurrentCard(); 

  }, [])


  return (
    <div className="App">
      <TopNav 
        onSearchChange={setSearch} 
        onSortClick={setSortBy} 
        onOrderClick={setOrder}
        onMinChange={setMinPrice}
        onMaxChange={setMaxPrice}
      />

      <BackToResult /> 
      
      {/** The ProductCard.tsx component used the useNavigate hook to navigate to this Details component
       * It also passed in the corresponding Pokemon Card info as an object in the state. Now, we can pass 
       * in that state Pokemon Card into the CardDescription component as a prop. 
       * Optionally: can also pass in this component's state variable 'card', which is obtained
       * along with the price history from the fetch statement. 
      */}
      <CardDescription cardInfo={receivedStatePokemonCard as PokemonCard} onNewPriceHistorySubmission={handleNewPriceHistorySubmission}/>

      <div className="info-flexbox">
        <PriceHistoryComponent priceHistoryArray={Array.isArray(priceHistory) ? priceHistory : []}/>
        <CardRater />
      </div>
      
      <Footer />
      
    </div>
  );
}
  
  export default Details;
