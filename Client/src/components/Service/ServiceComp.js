import React from 'react'
import '../WhyChooseUs/whychoocomp.css'
import imgSer1 from '../../assets/ServicesImg/ServiceImg3.png';
import imgSer2 from '../../assets/ServicesImg/ServiceImg4.png';
import imgSer3 from '../../assets/ServicesImg/ServiceImg5.png';
import { Link } from 'react-router-dom'


function ServiceComp() {
  return (
     <div className="afex__service-area afex__primary-bg before-bg-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title-area ltn__section-title-2 text-center">
                        <h6 className="section-subtitle ltn__secondary-color">// Service</h6>
                        <h1 className="afex__section-title white-color">What We Do<span>.</span></h1>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6">
                    <div className="afex__service-item-1">
                        <div className="service-item-img">
                            <img src={imgSer1} alt="#"/>
                            <div className="service-item-icon">
                                <i className="icon-mechanic"></i>
                            </div>
                        </div>
                        <div className="service-item-brief">
                            <h3><Link  to="service-details.html">Performance Upgrades</Link></h3>
                            <p>Lorem ipsum dolor sit amet, consect</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="afex__service-item-1">
                        <div className="service-item-img">
                            <img src={imgSer2} alt="#"/>
                            <div className="service-item-icon">
                                <i className="icon-car-parts-3"></i>
                            </div>
                        </div>
                        <div className="service-item-brief">
                            <h3><Link  to="service-details.html">Anti Lock Break</Link></h3>
                            <p>Lorem ipsum dolor sit amet, consect</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="afex__service-item-1">
                        <div className="service-item-img">
                            <img src={imgSer3} alt="#"/>
                            <div className="service-item-icon">
                                <i className="icon-repair"></i>
                            </div>
                        </div>
                        <div className="service-item-brief">
                            <h3><Link  to="/service">Crash Car Repair</Link></h3>
                            <p>Lorem ipsum dolor sit amet, consect</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceComp
