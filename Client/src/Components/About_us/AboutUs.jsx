import React from "react";
import "../../Assets/css/skin/skin-1.css";
import "../../Assets/css/style.min.css";
import "../../Assets/css/templete.min.css";
import "../../Assets/js/jquery.min.js";
// import '../../Assets/plugins/bootstrap/js/popper.min.js'
import "../../Assets/plugins/bootstrap/js/bootstrap.min.js";
import "../../Assets/plugins/bootstrap-select/bootstrap-select.min.js";
import "../../Assets/plugins/bootstrap-touchspin/jquery.bootstrap-touchspin.js";
import "../../Assets/plugins/magnific-popup/magnific-popup.js";
import "../../Assets/plugins/counter/waypoints-min.js";
import "../../Assets/plugins/counter/counterup.min.js";
// import '../../Assets/plugins/imagesloaded/imagesloaded.js'
// import '../../Assets/plugins/masonry/masonry-3.1.4.js'
// import '../../Assets/plugins/masonry/masonry.filter.js'
import "../../Assets/plugins/owl-carousel/owl.carousel.js";
// import '../../Assets/js/custom.min.js'
import "../../Assets/js/dz.carousel.min.js";
import "../../Assets/js/dz.ajax.js";
import image3 from "../../Assets/images/car_wash.jpg";
import image1 from "../../Assets/images/engine.jpg";
import image2 from "../../Assets/images/Tyre.jpg";

function AboutUs() {
  return (
    <div>
      {/* <!-- About Us --> */}
      <div className="section-full about-us bg-white content-inner-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dlab-tabs vertical">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      className="nav-link active"
                      href="#about"
                      aria-expanded="true"
                    >
                      <h4>About Us</h4>
                      <span>Company Overview</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      className="nav-link"
                      href="#history"
                      aria-expanded="false"
                    >
                      <h4>Car Washing</h4>
                      <span>Defening Milestones</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      className="nav-link"
                      href="#processing"
                      aria-expanded="false"
                    >
                      <h4>Tire Services</h4>
                      <span>Defening Milestones</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-toggle="tab"
                      className="nav-link"
                      href="#technology"
                      aria-expanded="false"
                    >
                      <h4>Engine Diagnostics</h4>
                      <span>Innovation & Adoption</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="about" className="tab-pane active">
                    <div className="row">
                      <div className="col-lg-7 about-contant">
                        <div className="m-b20">
                          <h2 className="text-uppercase m-t0 m-b10">
                            About <span className="text-primary">Us</span>
                          </h2>
                          <span className="text-secondry font-16">
                            Company Overview
                          </span>
                          <div className="clear"></div>
                        </div>
                        <p className="m-b30">
                          Welcome to Abe Garage, your trusted destination for
                          top-notch auto care and repair services. At Abe
                          Garage, we specialize in providing expert maintenance,
                          diagnostics, and repairs for all vehicle makes and
                          models. Our skilled technicians are dedicated to
                          keeping your car running smoothly and safely, offering
                          services ranging from routine oil changes and brake
                          checks to complex engine repairs and electrical
                          diagnostics. With a commitment to quality,
                          transparency, and customer satisfaction, Abe Garage is
                          here to ensure your vehicle performs at its best.
                          Visit us today for reliable, honest service you can
                          count on!
                        </p>
                        <div className="row">
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-user"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1800</span>+
                                </h2>
                                <p>Engineers & Workers</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-home"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">620</span>+
                                </h2>
                                <p>Factory In Worldwide</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-harddrives"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1527</span>+
                                </h2>
                                <p>Projects Completed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="m-b15">
                          There are many variations of passages of Lorem Ipsum
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the.
                        </p>
                        <a href="#" className="site-button">
                          Read More
                        </a>
                      </div>
                      <div className="col-lg-5 dlab-we-best">
                        <div className="p-lr20 p-tb40 m-t30 dlab-appoinment-now-form tp-dark clearfix  text-white rounded shadow">
                          <form
                            method="post"
                            className="dzForm "
                            action="script/contact.php"
                          >
                            <input
                              value="Appoinment"
                              name="dzToDo"
                              type="hidden"
                            />
                            <div className="row">
                              <div className="col-lg-12 text-center m-b20">
                                <h2 className="m-t0 m-b10 font-bold text-black">
                                  Make An Appointment
                                </h2>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group bg-blue">
                                  <input
                                    name="dzName"
                                    className="form-control font-bold bg-blue"
                                    placeholder="Name"
                                    type="text"
                                    style={{
                                      borderRadius: "5px",
                                      padding: "10px",
                                      backgroundColor: "blue",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <input
                                    name="dzEmail"
                                    className="form-control text-black font-bold"
                                    placeholder="Email"
                                    type="text"
                                    style={{
                                      borderRadius: "5px",
                                      padding: "10px",
                                      backgroundColor: "white",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <input
                                    name="dzOther[date]"
                                    className="form-control text-black font-bold"
                                    placeholder="Select Date"
                                    type="text"
                                    style={{
                                      borderRadius: "5px",
                                      padding: "10px",
                                      backgroundColor: "white",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <select
                                    className="form-control text-black font-bold"
                                    name="dzOther[service]"
                                    style={{
                                      borderRadius: "5px",
                                      padding: "10px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <option value="">Services</option>
                                    <option value="">Services 2</option>
                                    <option value="">Services 3</option>
                                    <option value="">Services 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <div className="input-group">
                                    <textarea
                                      name="dzMessage"
                                      rows="4"
                                      className="form-control text-black font-bold"
                                      required=""
                                      placeholder="Text message..."
                                      style={{
                                        borderRadius: "5px",
                                        padding: "10px",
                                        backgroundColor: "white",
                                      }}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 text-center">
                                <div className="dzFormMsg"></div>
                                <button
                                  name="Reset"
                                  value="Reset"
                                  type="reset"
                                  className="site-button m-r10 bg-white text-blue border-blue font-bold"
                                  style={{
                                    borderRadius: "5px",
                                    padding: "10px 20px",
                                  }}
                                >
                                  <span>Reset</span>
                                </button>
                                <button
                                  name="submit"
                                  type="submit"
                                  value="Submit"
                                  className="site-button bg-white text-blue border-blue font-bold"
                                  style={{
                                    borderRadius: "5px",
                                    padding: "10px 20px",
                                  }}
                                >
                                  <span>Submit</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="history" className="tab-pane">
                    <div className="row">
                      <div className="col-lg-5 about-img">
                        <img src={image3} alt="" />
                      </div>
                      <div className="col-lg-7 about-contant">
                        <div className="m-b20">
                          <h2 className="text-uppercase m-t0 m-b10">
                            Car <span className="text-primary"> Washing</span>
                          </h2>
                          <span className="text-secondry font-16">
                            Defening Milestones
                          </span>
                          <div className="clear"></div>
                        </div>
                        <p className="m-b30">
                          At Abe Garage, our car washing service is designed to
                          give your vehicle a spotless, showroom-like shine. We
                          use high-quality cleaning products and techniques to
                          remove dirt, grime, and road contaminants without
                          damaging your car's paint or finish. Whether you need
                          a quick exterior wash or a thorough cleaning that
                          includes waxing and detailing, our team ensures your
                          vehicle looks its best. Trust us to deliver a pristine
                          clean that enhances your car's appearance and protects
                          its value.
                        </p>
                        <div className="row">
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-user"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1800</span>+
                                </h2>
                                <p>Engineers & Workers</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-home"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">620</span>+
                                </h2>
                                <p>Factory In Worldwide</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-harddrives"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1527</span>+
                                </h2>
                                <p>Projects Completed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="m-b15">
                          There are many variations of passages of Lorem Ipsum
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the.
                        </p>
                        <a href="#" className="site-button">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div id="processing" className="tab-pane">
                    <div className="row">
                      <div className="col-lg-7 about-contant">
                        <div className="m-b20">
                          <h2 className="text-uppercase m-t0 m-b10">
                            Tire <span className="text-primary"> Services</span>
                          </h2>
                          <span className="text-secondry font-16">
                            Processing System
                          </span>
                          <div className="clear"></div>
                        </div>
                        <p className="m-b30">
                          Tires are a critical component of your vehicle’s
                          safety and performance. Abe Garage offers a range of
                          tire services, including tire rotation, balancing,
                          alignment, and replacements. Our experts help you
                          select the right tires for your vehicle and driving
                          conditions, ensuring maximum traction, fuel
                          efficiency, and longevity. Whether you need a simple
                          tire check or a full set of new tires, we’re here to
                          keep you rolling smoothly.
                        </p>
                        <div className="row">
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-user"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1800</span>+
                                </h2>
                                <p>Engineers & Workers</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-home"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">620</span>+
                                </h2>
                                <p>Factory In Worldwide</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-harddrives"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1527</span>+
                                </h2>
                                <p>Projects Completed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="m-b15">
                          There are many variations of passages of Lorem Ipsum
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the.
                        </p>
                        <a href="#" className="site-button">
                          Read More
                        </a>
                      </div>
                      <div className="col-lg-5 about-img">
                        <img src={image2} alt="" />
                      </div>
                    </div>
                  </div>
                  <div id="technology" className="tab-pane">
                    <div className="row">
                      <div className="col-lg-5 about-img">
                        <img src={image1} alt="" />
                      </div>
                      <div className="col-lg-7 about-contant">
                        <div className="m-b20">
                          <h2 className="text-uppercase m-t0 m-b10">
                            Engine
                            <span className="text-primary"> Diagnostics</span>
                          </h2>
                          <span className="text-secondry font-16">
                            Innovation & Adoption
                          </span>
                          <div className="clear"></div>
                        </div>
                        <p className="m-b30">
                          When your check engine light comes on or your car
                          isn’t performing as it should, our engine diagnostics
                          service can pinpoint the problem quickly and
                          accurately. At Abe Garage, we use advanced diagnostic
                          tools to identify and resolve engine issues, from
                          minor sensor malfunctions to complex mechanical
                          failures. Our goal is to get you back on the road with
                          a fully functional engine, minimizing downtime and
                          avoiding costly repairs.
                        </p>
                        <div className="row">
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-user"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1800</span>+
                                </h2>
                                <p>Engineers & Workers</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-home"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">620</span>+
                                </h2>
                                <p>Factory In Worldwide</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-4 m-b15">
                            <div className="icon-bx-wraper bx-style-1 p-tb15 p-lr10 center">
                              <div className="icon-bx-sm radius bg-primary m-b5">
                                {" "}
                                <a href="#" className="icon-cell">
                                  <i className="ti-harddrives"></i>
                                </a>{" "}
                              </div>
                              <div className="icon-content">
                                <h2 className="text-primary m-t20 m-b10">
                                  <span className="counter">1527</span>+
                                </h2>
                                <p>Projects Completed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="m-b15">
                          There are many variations of passages of Lorem Ipsum
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the.
                        </p>
                        <a href="#" className="site-button">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About Us END --> */}
    </div>
  );
}

export default AboutUs;
