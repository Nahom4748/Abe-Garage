import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

function Login() {
     const [show, doShow] = useState(false);

     useEffect(() => {
       const handleScroll = () => {
         if (window.scrollY > 300) {
           doShow(true);
         } else {
           doShow(false);
         }
       };

       window.addEventListener("scroll", handleScroll);

       // Clean up the event listener when the component unmounts
       return () => {
         window.removeEventListener("scroll", handleScroll);
       };
     }, []);

  return (
     <div className="ltn__login-area pt-155">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title-area text-center">
                        <h1 className="section-title">Sign In <br/>To  Your Account</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br/>
                             Sit aliquid,  Non distinctio vel iste.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="account-login-inner">
                        <form action="#" className="ltn__form-box contact-form-box">
                            <input type="text" name="email" placeholder="Email*"/>
                            <input type="password" name="password" placeholder="Password*"/>
                            <div className="btn-wrapper mt-0">
                                <button className="theme-btn-1 btn btn-block" type="submit">SIGN IN</button>
                            </div>
                            <div className="go-to-btn mt-20">
                                <Link to="#" title="Forgot Password?" data-toggle="modal" data-target="#ltn_forget_password_modal"><small>FORGOTTEN YOUR PASSWORD?</small></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="account-create text-center pt-50">
                        <h4>DON'T HAVE AN ACCOUNT?</h4>
                        <p>Add items to your wishlistget personalised recommendations <br/>
                            check out more quickly track your orders register</p>
                        <div className="btn-wrapper">
                            <Link to="/register" className="theme-btn-1 btn black-btn">CREATE ACCOUNT</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
