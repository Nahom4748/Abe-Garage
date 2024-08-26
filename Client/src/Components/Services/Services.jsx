import React from 'react'
import img1 from '../../Assets/Images/ServiceImg1.png'
import img2 from "../../Assets/Images/ServiceImg2.png";
import img3 from "../../Assets/Images/ServiceImg3.png";
import img4 from "../../Assets/Images/ServiceImg4.png";
import img5 from "../../Assets/Images/ServiceImg5.png";
import img6 from "../../Assets/Images/ServiceImg6.png";


function Services() {
  return (
    <>
    
    <div className="section-full bg-white content-inner">
            <div className="container">
                <div className="section-head text-center ">
                    <h2 className="text-uppercase">Our Best <span className="text-primary">Services</span></h2>
					<p>There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
                </div>
                <div className="section-content ">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 m-b30">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img1}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Opti Coat</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
                        <div className="col-lg-4 col-md-6 col-sm-6 m-b30">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img2}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Car Detailing</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 m-b30">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img3}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Car Polish</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 m-b30">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img4}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Car Washing</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 m-b30">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img5}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Eco Friendly</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 m-b10">
							<div className="dlab-box">
								<div className="dlab-media"> <a href="#"><img src={img6}/></a> </div>
								<div className="dlab-info p-a20 text-center bg-gray">
									<div className="p-lr20">
										<h4 className="m-a0 bg-primary service-head"><a href="#" className="text-white">Exterior Cleaning</a></h4>
									</div>	
									<p className="m-b0">There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry..Lorem Ipsum is simply Ipsum is simply dummy text of the..</p>
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Services
