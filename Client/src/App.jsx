import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HeroPage from "./Components/HeroPage/HeroPage";
import Services from "./Components/Services/Services";
import "./assets/css/coming-soon.css";
import "./assets/css/css-slide.css";
import "./assets/css/star-rating-svg.css";
import "./assets/css/style.css";
import "./assets/css/style.min.css";
import "./assets/css/swiper.css";
import "./assets/css/templete.css";
import "./assets/css/templete.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <HeroPage />
      <Services />
      <Footer />
    </>
  );
}

export default App;
