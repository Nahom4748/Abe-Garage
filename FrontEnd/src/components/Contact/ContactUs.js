import React from "react";

function ContactUs() {
  return (
    <>
      <div className="section-bg-1 mb--200">
        <h6
          className="section-subtitle ltn__secondary-color"
          style={{ marginLeft: "300px", paddingTop: "78px" }}
        >
          <strong>//CONTACT US</strong>{" "}
        </h6>
        <h1
          className="section-title"
          style={{ marginLeft: "300px", paddingBottom: "20px" }}
        >
          Contact Us
        </h1>
        <div className="ltn__contact-address-area  mb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                  <div className="ltn__contact-address-icon">
                    <img
                      src="http://127.0.0.1:5500/withnahom/Resource/autixir-car-service-bootstrap-v4/autixir/img/icons/10.png"
                      alt="Icon Image"
                    />
                  </div>
                  <h3>Email Address</h3>
                  <p>
                    info@webmail.com <br />
                    jobs@webexample.com
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                  <div className="ltn__contact-address-icon">
                    <img
                      src="	http://127.0.0.1:5500/withnahom/Resource/autixir-car-service-bootstrap-v4/autixir/img/icons/11.png"
                      alt="Icon Image"
                    />
                  </div>
                  <h3>Phone Number</h3>
                  <p>
                    +0123-456789 <br /> +987-6543210
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                  <div className="ltn__contact-address-icon">
                    <img
                      src="	http://127.0.0.1:5500/withnahom/Resource/autixir-car-service-bootstrap-v4/autixir/img/icons/12.png"
                      alt="Icon Image"
                    />
                  </div>
                  <h3>Office Address</h3>
                  <p>
                    18/A, New Born Town Hall <br />
                    New York, US
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ltn__contact-message-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ltn__form-box contact-form-box box-shadow white-bg">
                  <h4 className="title-2">Contact us</h4>
                  <form id="contact-form" action="mail.php" method="post">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-item-name ltn__custom-icon">
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-email ltn__custom-icon">
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item">
                          <select className="nice-select">
                            <option>Select Service Type</option>
                            <option>Car Repair </option>
                            <option>Engine Repairing </option>
                            <option>Oil Change</option>
                            <option>Car Wash</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-item-phone ltn__custom-icon">
                          <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        name="message"
                        placeholder="Enter message"
                      ></textarea>
                    </div>
                    <p>
                      <label className="input-info-save mb-0">
                        <input type="checkbox" name="agree" /> Save my name,
                        email, and website in this browser for the next time I
                        comment.
                      </label>
                    </p>
                    <div className="btn-wrapper mt-0">
                      <button
                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                        type="submit"
                      >
                        Submit email
                      </button>
                    </div>
                    <p className="form-messege mb-0 mt-20"></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
