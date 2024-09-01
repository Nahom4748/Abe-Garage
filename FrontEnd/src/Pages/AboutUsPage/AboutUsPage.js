// import "../../components/AboutUs/aboutus.css";
import "../../Pages/AboutUsPage/aboutUsPage.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../assets/img/effect/1.png";
import img2 from "../../assets/img/effect/2.png";
import img3 from "../../assets/img/effect/3.png";
import img4 from "../../assets/img/effect/4.png";
import img5 from "../../assets/img/effect/5.png";
import img6 from "../../assets/img/effect/6.png";
import img7 from "../../assets/img/icons/7.png";
import img9 from "../../assets/img/bg/9.jpg";
import Header from "../../components/Header/Header";
import HeaderPage from "../HeaderPage/HeaderPage";
import imgT4 from "../../assets/img/team/4.jpg";
import imgAbe from "../../assets/abe/240-g.jpg";

function AboutUsPage() {
  return (
    <>
      <HeaderPage />
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image"
        style={{ backgroundImage: `url(${img9})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // Welcome to our company
                  </h6>
                  <h1
                    className="section-title white-color"
                    style={{ color: "white" }}
                  >
                    About Us
                  </h1>
                </div>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>About us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__about-us-area pt-0 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="afex__about-us-wrap" style={{ display: "flex" }}>
                <img src={imgT4} alt="About Us Image" />
                <div
                  className="afex__about-us about-us-img-info-2"
                  style={{ marginLeft: "-183px", marginTop: "413px" }}
                >
                  <div className="about-us-img-info-inner">
                    <h1>
                      25<span>+</span>
                    </h1>
                    <h6>Years Experience</h6>
                    <span className="dots-bottom"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // About Us
                  </h6>
                  <h1 className="section-title">
                    Safety Is Our First & Main Priority<span>.</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore
                  </p>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipis icing elit, sed
                  do eius mod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad min im veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequ at.{" "}
                </p>
                <div className="btn-wrapper">
                  <a
                    href="service.html"
                    className="theme-btn-3 btn btn-effect-4"
                  >
                    OUR SERVICES
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__feature-area section-bg-1 pt-115 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h6 className="section-subtitle ltn__secondary-color">
                  // features //
                </h6>
                <h1 className="section-title">
                  Why Choose Us<span>.</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-7">
                <div className="ltn__feature-icon-title">
                  <div className="ltn__feature-icon">
                    <span>
                      <i className="icon-car-parts-3"></i>
                    </span>
                  </div>
                  <h3>
                    <a href="service-details.html">All Kind Brand</a>
                  </h3>
                </div>
                <div className="ltn__feature-info">
                  <p>
                    Lorem ipsum dolor sit ame it, consectetur adipisicing elit,
                    sed do eiusmod te mp or incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-7">
                <div className="ltn__feature-icon-title">
                  <div className="ltn__feature-icon">
                    <span>
                      <i className="icon-mechanic"></i>
                    </span>
                  </div>
                  <h3>
                    <a href="service-details.html">Brake Fluid Exchange</a>
                  </h3>
                </div>
                <div className="ltn__feature-info">
                  <p>
                    Lorem ipsum dolor sit ame it, consectetur adipisicing elit,
                    sed do eiusmod te mp or incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-7">
                <div className="ltn__feature-icon-title">
                  <div className="ltn__feature-icon">
                    <span>
                      <i className="icon-repair"></i>
                    </span>
                  </div>
                  <h3>
                    <a href="service-details.html">Maintenance Package</a>
                  </h3>
                </div>
                <div className="ltn__feature-info">
                  <p>
                    Lorem ipsum dolor sit ame it, consectetur adipisicing elit,
                    sed do eiusmod te mp or incididunt ut labore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
