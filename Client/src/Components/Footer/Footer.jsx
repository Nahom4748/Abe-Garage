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
  );
}

export default Footer;
