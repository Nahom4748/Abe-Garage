import React from 'react'
import './AddCustomer.css'
import image from '../../Assets/images/engine.jpg'


const AddCustomer = () => {
  return (
    <section class="h-60 bg-dark">
  <div class="container py-5 h-100" style={{ width: "75%"}}>
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-5 d-none d-xl-block">
              <img src={image}
                alt="Sample photo" class="img-fluid"
                style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}/>
            </div>
            <div class="col-xl-7">
              <div class="card-body p-md-5 text-black">
                <h2 class="mb-4 text-uppercase" style={{marginLeft:"15px"}}>Add a new Employee</h2>
                  <div class="col-md-12 mb-2">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1m" class="form-control form-control-lg" placeholder="Employee's email " />
                      <label class="form-label" for="form3Example1m" />
                    </div>
                  </div>
                  <div class="col-md-12 mb-2">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" placeholder="Employee's first name" />
                      <label class="form-label" for="form3Example1n"/>
                    </div>
                  </div>
                  <div class="col-md-12 mb-2">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" placeholder="Employee's last name" />
                      <label class="form-label" for="form3Example1n"/>
                    </div>
                  </div>
                  
                  <div class="col-md-12 mb-2 ">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" placeholder="Employee's phone ($$$-$$$-$$$$)" />
                      <label class="form-label" for="form3Example1n"/>
                    </div>
                  </div>
                  <div class="col-md-12 mb-2 ">
                    <div data-mdb-input-init class="form-outline">
                    <select
                className="form-select form-control form-control-lg  "
                defaultValue="Employee" >
                  <option disabled><b>Employee</b></option>
                  </select>
                      <label class="form-label" for="form3Example1n"/>
                    </div>
                  </div>
                  <div class="col-md-12" >
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" placeholder="Employee's password" />
                      <label class="form-label" for="form3Example1n"/>
                    </div>
                  </div>
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-lg ms-3" style={{backgroundColor: "rgb(196, 8, 8)", color: "white"}}>Add Employee</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
  )
}

export default AddCustomer