import React from "react";
import logo from "../../Assets/images/logo.png";


function Footer() {
  return (
    <footer className="site-footer">
      <div classNameName="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 footer-col-4">
              <div className="widget widget_about">
                <div className="logo-footer logo-white">
                  <img src={logo} alt="" />
                </div>
                <p>
                  <strong>Auto Care</strong> ipsum dolor sit amet, consectetuer
                  adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                  laoreet dolore agna aliquam erat . wisi enim ad minim veniam,
                  quis tation. sit amet, consec tetuer.ipsum dolor sit amet,
                  consectetuer.
                </p>
                <ul className="dlab-social-icon dez-border">
                  <li>
                    <a
                      className="fab fa-facebook-f"
                      href="https://www.facebook.com/"
                      target="blank"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-twitter"
                      href="https://twitter.com/"
                      target="blank"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-linkedin-in"
                      href="https://www.linkedin.com/"
                      target="blank"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-facebook-f"
                      href="https://www.facebook.com/"
                      target="blank"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-6 col-sm-6 footer-col-4">
                        <div className="widget recent-posts-entry">
                            <h4 className="m-b15 text-uppercase">Recent Post</h4>
                            <div className="dlab-separator-outer m-b10">
                                <div className="dlab-separator bg-white style-skew"></div>
                            </div>
                            <div className="widget-post-bx">
                                <div className="widget-post clearfix">
                                    <div className="dlab-post-media"> <img src="images/blog/recent-blog/pic1.jpg" alt="" width="200" height="143"/> </div>
                                    <div className="dlab-post-info">
                                        <div className="dlab-post-header">
                                            <h6 className="post-title text-uppercase"><a href="blog-single.html">How Will Autocare</a></h6>
                                        </div>
                                        <div className="dlab-post-meta">
                                            <ul>
                                                <li className="post-author">By <a href="#">Admin</a></li>
                                                <li className="post-comment"><i className="fas fa-comments"></i> 28</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-post clearfix">
                                    <div className="dlab-post-media"> <img src="images/blog/recent-blog/pic2.jpg" alt="" width="200" height="160"/> </div>
                                    <div className="dlab-post-info">
                                        <div className="dlab-post-header">
                                            <h6 className="post-title text-uppercase"><a href="blog-single.html">Seven fact about</a></h6>
                                        </div>
                                        <div className="dlab-post-meta">
                                            <ul>
                                                <li className="post-author">By <a href="#">Admin</a></li>
                                                <li className="post-comment"><i className="fas fa-comments"></i> 28</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-post clearfix">
                                    <div className="dlab-post-media"> <img src="images/blog/recent-blog/pic3.jpg" alt="" width="200" height="160"/> </div>
                                    <div className="dlab-post-info">
                                        <div className="dlab-post-header">
                                            <h6 className="post-title  text-uppercase"><a href="blog-single.html">10 Things You</a></h6>
                                        </div>
                                        <div className="dlab-post-meta">
                                            <ul>
                                                <li className="post-author">By <a href="#">Admin</a></li>
                                                <li className="post-comment"><i className="fas fa-comments"></i> 28</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="col-lg-4 col-md-6 col-sm-6 footer-col-4">
              <div className="widget widget_services">
                <h4 className="m-b15 text-uppercase">Our services</h4>
                <div className="dlab-separator-outer m-b10">
                  <div className="dlab-separator bg-white style-skew"></div>
                </div>
                <ul>
                  <li>
                    <a href="services-2.html">Engine Diagnostics</a>
                  </li>
                  <li>
                    <a href="services-2.html">Lube, Oil and Filters</a>
                  </li>
                  <li>
                    <a href="services-2.html">Belts and Hoses</a>
                  </li>
                  <li>
                    <a href="services-2.html">Air Conditioning</a>
                  </li>
                  <li>
                    <a href="services-2.html">Brake Repair</a>
                  </li>
                  <li>
                    <a href="services-2.html">Lube, Oil and Filters</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 footer-col-4">
              <div className="widget widget_getintuch">
                <h4 className="m-b15 text-uppercase">Contact us</h4>
                <div className="dlab-separator-outer m-b10">
                  <div className="dlab-separator bg-white style-skew"></div>
                </div>
                <ul>
                  <li>
                    <i className="ti-location-pin"></i>
                    <strong>address</strong> demo address #8901 Marmora Road Chi
                    Minh City, Vietnam{" "}
                  </li>
                  <li>
                    <i className="ti-mobile"></i>
                    <strong>phone</strong>0800-123456 (24/7 Support Line)
                  </li>
                  <li>
                    <i className="ti-printer"></i>
                    <strong>FAX</strong>(123) 123-4567
                  </li>
                  <li>
                    <i className="ti-email"></i>
                    <strong>email</strong>info@demo.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom footer-line">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 text-left">
              <span>© Copyright 2022</span>
            </div>
            <div className="col-lg-4 col-md-4 text-center">
              <span>
                {" "}
                Design With <i className="ti-heart text-primary heart"></i> By
                <a href="https://www.dexignlab.com/" target="_blank">
                  DexignLab
                </a>{" "}
              </span>
            </div>
            <div className="col-lg-4 col-md-4 text-right ">
              <a href="about-1.html"> About Us</a>
              <a href="faq-1.html"> FAQs</a>
              <a href="contact.html"> Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    // <footer class="ltn__footer-area ltn__footer-2 ltn__footer-color-1">
    //     <div class="footer-top-area  section-bg-2">
    //         <div class="container">
    //             <div class="row">
    //                 <div class="col-xl-4 col-md-5">
    //                     <div class="footer-widget ltn__footer-timeline-widget ltn__footer-timeline-widget-1 bg-image bg-overlay-theme-black-90" data-bg="img/bg/4.jpg">
    //                         <h6 class="ltn__secondary-color text-uppercase">// time shedule</h6>
    //                         <h4 class="footer-title">Meet In Timeline.</h4>
    //                         <ul>
    //                             <li>Monday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Tuesday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Wednesday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Thursday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Friday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Saturday <span>07:00AM - 20:00PM</span></li>
    //                             <li>Sunday <span>Official Holiday</span></li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //                 <div class="col-xl-5 col-md-7">
    //                     <div class="footer-widget footer-menu-widget footer-menu-widget-2-column clearfix">
    //                         <h4 class="footer-title">Services.</h4>
    //                         <div class="footer-menu">
    //                             <ul>
    //                                 <li><a href="service.html">Engine Diagnostics</a></li>
    //                                 <li><a href="service.html">Vehicles Damaged</a></li>
    //                                 <li><a href="service.html">Air Conditioning Evac</a></li>
    //                                 <li><a href="service.html">Anti Lock Brake Service</a></li>
    //                                 <li><a href="service.html">Computer Diagnostics</a></li>
    //                                 <li><a href="service.html">Performance Upgrades</a></li>
    //                             </ul>
    //                         </div>
    //                         <div class="footer-menu">
    //                             <ul>
    //                                 <li><a href="service.html">Car Wash & Cleaning</a></li>
    //                                 <li><a href="service.html">Choose your Repairs</a></li>
    //                                 <li><a href="service.html">Free Consultancy</a></li>
    //                                 <li><a href="service.html">Emergency Time</a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="col-xl-3 col-md-6">
    //                     <div class="footer-widget footer-blog-widget">
    //                         <h4 class="footer-title">News Feeds.</h4>
    //                         <div class="ltn__footer-blog-item">
    //                             <div class="ltn__blog-meta">
    //                                 <ul>
    //                                     <li class="ltn__blog-date"><i class="far fa-envelope"></i> June 24, 2020</li>
    //                                 </ul>
    //                             </div>
    //                             <h4 class="ltn__blog-title"><a href="blog-details.html">The branch of biology that
    //                                 deals with the normal.</a></h4>
    //                         </div>
    //                         <div class="ltn__footer-blog-item">
    //                             <div class="ltn__blog-meta">
    //                                 <ul>
    //                                     <li class="ltn__blog-date"><i class="far fa-envelope"></i> June 24, 2020</li>
    //                                 </ul>
    //                             </div>
    //                             <h4 class="ltn__blog-title"><a href="blog-details.html">The branch of biology that
    //                                 deals with the normal.</a></h4>
    //                         </div>
    //                         <div class="ltn__footer-blog-item">
    //                             <div class="ltn__blog-meta">
    //                                 <ul>
    //                                     <li class="ltn__blog-date"><i class="far fa-envelope"></i> June 24, 2020</li>
    //                                 </ul>
    //                             </div>
    //                             <h4 class="ltn__blog-title"><a href="blog-details.html">The branch of biology that
    //                                 deals with the normal.</a></h4>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="ltn__copyright-area ltn__copyright-2">
    //         <div class="container">
    //             <div class="row">
    //                 <div class="col-md-6 col-12">
    //                     <div class="site-logo-wrap">
    //                         <div class="site-logo">
    //                             <a href="index.html"><img src="img/logo-2.png" alt="Logo"/></a>
    //                         </div>
    //                         <div class="get-support ltn__copyright-design clearfix">
    //                             <div class="get-support-info">
    //                                 <h6>Copyright & Design By</h6>
    //                                 <h4>Company - <span class="current-year"></span></h4>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="col-md-6 col-12 align-self-center">
    //                     <div class="ltn__copyright-menu text-right">
    //                         <ul>
    //                             <li><a href="#">Terms & Conditions</a></li>
    //                             <li><a href="#">Claim</a></li>
    //                             <li><a href="#">Privacy & Policy</a></li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </footer>

  );
}


export default Footer

