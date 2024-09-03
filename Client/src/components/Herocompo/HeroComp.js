import React from 'react'
// import slider from '../../assets/img/slider/41.jpg'
import slider1 from '../../assets/ServicesImg/ServiceImg1.png'
import { Link } from 'react-router-dom'
import video from "../../assets/Advert_Vedio/Advert.mp4"

function HeroComp() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        className="w-100 position-absolute top-0 left-0 h-100 object-fit-cover"
        // style={{ zIndex: "1", backgroundImage: "{video}" }}
      >
        <source
          style={{ zIndex: "", backgroundImage: "{video}" }}
          src={video}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="ltn__slider-area ltn__slider-4 ">
        <div className="ltn__slide-one-active----- slick-slide-arrow-1----- slick-slide-dots-1----- arrow-white----- ltn__slide-animation-active">
          <div
            className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-4 text-color-white bg-image"
            data-bg="img/slider/31-bg.png"
          >
            <div className="ltn__slide-item-inner text-center">
              <div className="container">
                <div className="row">
                  <div
                    className="col-lg-12 align-self-center"
                    style={{ textAlign: "center" }}
                  >
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <h6 className="slide-sub-title ltn__secondary-color animated text-uppercase">
                          // any kind of car you will get //
                        </h6>
                        <h1 className="slide-title animated ">
                          Professional Car <br /> Service Provide
                        </h1>
                        <div className="btn-wrapper animated">
                          <a
                            href="/service"
                            className="theme-btn-1 btn btn-effect-1"
                          >
                            OUR SERVICES
                          </a>
                          <a
                            href="/about"
                            className="btn btn-transparent btn-effect-2 white-color"
                          >
                            LEARN MORE
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="ltn__slide-animation pb-150 mb-100">
                      <div className="slide-item-img"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroComp
