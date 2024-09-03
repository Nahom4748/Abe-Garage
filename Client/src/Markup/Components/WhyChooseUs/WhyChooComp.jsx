import React from "react";
import imgOther1 from "../../../Assets/ServicesImg/ServiceImg6.png";
import imgOther2 from "../../../Assets/ServicesImg/ServiceImg2.png";
import { Link } from "react-router-dom";
import "./whychoocomp.css";

function WhyChooComp() {
  return (
    <div className="ltn__why-choose-us-area section-bg-1 pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="why-choose-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  // Why Choose Us
                </h6>
                <h1 className="section-title">
                  Safety Is Our First Priority<span>.</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </p>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <i className="icon-car-parts-1"></i>
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link to="/service">Anytime Get Your Service</Link>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor ut labore et dolore magna aliqua.
                        Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6">
                  <div className="why-choose-us-feature-item">
                    <div className="why-choose-us-feature-icon">
                      <i className="icon-automobile"></i>
                    </div>
                    <div className="why-choose-us-feature-brief">
                      <h3>
                        <Link to="/service">Hardcore Repair Service</Link>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor ut labore et dolore magna aliqua.
                        Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="why-choose-us-img-wrap">
              <div className="why-choose-us-img-1 text-left">
                <img src={imgOther1} alt="Image" />
              </div>
              <div className="why-choose-us-img-2 text-right">
                <img src={imgOther2} alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooComp;
