import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import HeaderPage from "../HeaderPage/HeaderPage";
import img9 from "../../assets/img/bg/9.jpg";

function LoginPage() {
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
                    Account
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
      <div className="ltn__login-area pt-15">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">
                  Sign In <br />
                  To Your Account
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  <br />
                  Sit aliquid, Non distinctio vel iste.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="account-login-inner">
                <form action="#" className="ltn__form-box contact-form-box">
                  <input type="text" name="email" placeholder="Email*" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password*"
                  />
                  <div className="btn-wrapper mt-0">
                    <button className="theme-btn-1 btn btn-block" type="submit">
                      SIGN IN
                    </button>
                  </div>
                  <div className="go-to-btn mt-20">
                    <Link
                      to="#"
                      title="Forgot Password?"
                      data-toggle="modal"
                      data-target="#ltn_forget_password_modal"
                    >
                      <small>FORGOTTEN YOUR PASSWORD?</small>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="account-create text-center pt-50">
                <h4>DON'T HAVE AN ACCOUNT?</h4>
                <p>
                  Add items to your wishlistget personalised recommendations{" "}
                  <br />
                  check out more quickly track your orders register
                </p>
                <div className="btn-wrapper">
                  <Link to="/register" className="theme-btn-1 btn black-btn">
                    CREATE ACCOUNT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
