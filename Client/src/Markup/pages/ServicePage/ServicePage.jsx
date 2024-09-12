import React from "react";
import img1 from "../../../Assets/img/Gif.gif";
import img2 from "../../../Assets/img/10001.jpg";
function ServicePage() {
  return (
    <>
      {/* <HeaderPage /> */}
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-blue-90 bg-image"
        style={{
          backgroundImage: `url(${img2})`,
        }}
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
                    What We Do
                  </h1>
                </div>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__about-us-area pb-115">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 align-self-center">
              <div className="about-us-img-wrap ltn__img-shape-left  about-img-left">
                <img src={img1} alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // RELIABLE SERVICES
                  </h6>
                  <h1 className="section-title">
                    We are Qualified & Professional<span>.</span>
                  </h1>
                  <p>
                    At [Company Name], we take pride in delivering top-quality
                    services with a team of certified professionals. Our
                    commitment to excellence ensures that every project is
                    completed to the highest standards.
                  </p>
                </div>
                <div className="about-us-info-wrap-inner about-us-info-devide">
                  <p>
                    With years of experience in the industry, we are equipped to
                    handle a wide range of services tailored to meet your needs.
                    Whether you're looking for expert advice, hands-on support,
                    or the latest in technology solutions, we've got you
                    covered. Our team works around the clock to provide seamless
                    service that you can count on.
                  </p>
                  <div className="list-item-with-icon">
                    <ul>
                      <li>
                        <a href="contact.html">24/7 Online Support</a>
                      </li>
                      <li>
                        <a href="team.html">Expert Team</a>
                      </li>
                      <li>
                        <a href="service-details.html">
                          State-of-the-Art Equipment
                        </a>
                      </li>
                      <li>
                        <a href="shop.html">Extensive Product Range</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__service-area section-bg-1 pt-115 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h6 className="section-subtitle ltn__secondary-color">
                  // Service
                </h6>
                <h1 className="section-title">
                  What We Do<span>.</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-maintenance-1"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">// Tire and wheel</h6>
                  <h3>
                    <a href="service-details.html">
                      There are many variations of passages of Lorem.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-mechanic"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Drivability problems
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      majority have suffered alteration in some form.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-car-parts-3"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Automotive filters
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      Excellece in automotive services since 1996.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-car-parts"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">// Tire and wheel</h6>
                  <h3>
                    <a href="service-details.html">
                      There are many variations of passages of Lorem.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-repair"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Drivability problems
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      majority have suffered alteration in some form.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="ltn__service-item-2 white-bg">
                <div className="service-item-icon">
                  <i className="icon-automobile"></i>
                </div>
                <div className="service-item-brief">
                  <h6 className="ltn__secondary-color">
                    // Automotive filters
                  </h6>
                  <h3>
                    <a href="service-details.html">
                      Excellece in automotive services since 1996.
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <span>//</span> Tire puncher with cleaning
                    </li>
                    <li>
                      <span>//</span> Tire Customization
                    </li>
                    <li>
                      <span>//</span> Tire check & fixing
                    </li>
                    <li>
                      <span>//</span> Tire change & color
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__blog-area pt-115 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2 text-center">
                <h6 className="section-subtitle ltn__secondary-color">
                  // blog & insights
                </h6>
                <h1 className="section-title">
                  News Feeds<span>.</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row  ltn__blog-slider-one-active slick-arrow-1">
            <div className="col-lg-12">
              <div
                className="ltn__blog-item ltn__blog-item-4 bg-image"
                data-bg="img/blog/1.jpg"
              >
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-author">
                        <a href="#">
                          <i className="far fa-user"></i>by: Admin
                        </a>
                      </li>
                      <li className="ltn__blog-tags">
                        <a href="#">
                          <i className="fas fa-tags"></i>Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <a href="blog-details.html">
                      Electric Car Maintenance, Servicing & Repairs
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum labore et dolore mag na aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt"></i> June 24, 2020
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <a href="blog-details.html">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="ltn__blog-item ltn__blog-item-4 bg-image"
                data-bg="img/blog/2.jpg"
              >
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-author">
                        <a href="#">
                          <i className="far fa-user"></i>by: Admin
                        </a>
                      </li>
                      <li className="ltn__blog-tags">
                        <a href="#">
                          <i className="fas fa-tags"></i>Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <a href="blog-details.html">
                      Common Engine Oil Problems and Solutions
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum labore et dolore mag na aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt"></i> June 24, 2020
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <a href="blog-details.html">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="ltn__blog-item ltn__blog-item-4 bg-image"
                data-bg="img/blog/3.jpg"
              >
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-author">
                        <a href="#">
                          <i className="far fa-user"></i>by: Admin
                        </a>
                      </li>
                      <li className="ltn__blog-tags">
                        <a href="#">
                          <i className="fas fa-tags"></i>Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <a href="blog-details.html">
                      How to Prepare for your First Track Day!
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum labore et dolore mag na aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt"></i> June 24, 2020
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <a href="blog-details.html">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="ltn__blog-item ltn__blog-item-4 bg-image"
                data-bg="img/blog/4.jpg"
              >
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-author">
                        <a href="#">
                          <i className="far fa-user"></i>by: Admin
                        </a>
                      </li>
                      <li className="ltn__blog-tags">
                        <a href="#">
                          <i className="fas fa-tags"></i>Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <a href="blog-details.html">
                      The branch of biology that deals with the normal.
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum labore et dolore mag na aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt"></i> June 24, 2020
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <a href="blog-details.html">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ltn__blog-item ltn__blog-item-4">
                <div className="ltn__blog-brief">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-author">
                        <a href="#">
                          <i className="far fa-user"></i>by: Admin
                        </a>
                      </li>
                      <li className="ltn__blog-tags">
                        <a href="#">
                          <i className="fas fa-tags"></i>Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="ltn__blog-title">
                    <a href="blog-details.html">
                      How to: Make Your Tires Last Longer
                    </a>
                  </h3>
                  <p>
                    Lorem ipsum labore et dolore mag na aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco.
                  </p>
                  <div className="ltn__blog-meta-btn">
                    <div className="ltn__blog-meta">
                      <ul>
                        <li className="ltn__blog-date">
                          <i className="far fa-calendar-alt"></i> June 24, 2020
                        </li>
                      </ul>
                    </div>
                    <div className="ltn__blog-btn">
                      <a href="blog-details.html">Read more</a>
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

export default ServicePage;
