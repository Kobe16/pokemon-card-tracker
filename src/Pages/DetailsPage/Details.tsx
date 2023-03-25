import './Details.css';
import TopNav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import CardRater from '../../Components/CardRater/CardRater';
import PriceHistory from '../../Components/PriceHistory/PriceHistory';
import CardDescription from '../../Components/CardDescription/CardDescription'; 
import cardInfo from '../../Components/ProductCard/cardInfo';

function Details() {
    return (
      <div className="App">
        <TopNav />

        <CardDescription cardInfo={cardInfo[0]}/>

        <div className="InfoFlexBox">
          <PriceHistory cardInfo={cardInfo[0]}/>
          <CardRater />
        </div>
        
        <Footer />
        
      </div>
    );
  }
  
  export default Details;
