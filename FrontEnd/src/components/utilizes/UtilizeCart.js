import React from "react";
import img1 from "../../assets/img/product/1.png";

function UtilizeCart() {
  return (
    <div
      id="ltn__utilize-cart-menu"
      className="ltn__utilize ltn__utilize-cart-menu"
    >
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head">
          <span className="ltn__utilize-menu-title">Cart</span>
          <button className="ltn__utilize-close">×</button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">
          <div className="mini-cart-item clearfix">
            <div className="mini-cart-img">
              <a href="#">
                <img src={img1} alt="Image" />
              </a>
              <span className="mini-cart-item-delete">
                <i className="icon-cancel"></i>
              </span>
            </div>
            <div className="mini-cart-info">
              <h6>
                <a href="#">Wheel Bearing Retainer</a>
              </h6>
              <span className="mini-cart-quantity">1 x $65.00</span>
            </div>
          </div>
          <div className="mini-cart-item clearfix">
            <div className="mini-cart-img">
              <a href="#">
                <img src="img/product/2.png" alt="Image" />
              </a>
              <span className="mini-cart-item-delete">
                <i className="icon-cancel"></i>
              </span>
            </div>
            <div className="mini-cart-info">
              <h6>
                <a href="#">Brake Conversion Kit</a>
              </h6>
              <span className="mini-cart-quantity">1 x $85.00</span>
            </div>
          </div>
          <div className="mini-cart-item clearfix">
            <div className="mini-cart-img">
              <a href="#">
                <img src="img/product/3.png" alt="Image" />
              </a>
              <span className="mini-cart-item-delete">
                <i className="icon-cancel"></i>
              </span>
            </div>
            <div className="mini-cart-info">
              <h6>
                <a href="#">OE Replica Wheels</a>
              </h6>
              <span className="mini-cart-quantity">1 x $92.00</span>
            </div>
          </div>
          <div className="mini-cart-item clearfix">
            <div className="mini-cart-img">
              <a href="#">
                <img src="img/product/4.png" alt="Image" />
              </a>
              <span className="mini-cart-item-delete">
                <i className="icon-cancel"></i>
              </span>
            </div>
            <div className="mini-cart-info">
              <h6>
                <a href="#">Shock Mount Insulator</a>
              </h6>
              <span className="mini-cart-quantity">1 x $68.00</span>
            </div>
          </div>
        </div>
        <div className="mini-cart-footer">
          <div className="mini-cart-sub-total">
            <h5>
              Subtotal: <span>$310.00</span>
            </h5>
          </div>
          <div className="btn-wrapper">
            <a href="cart.html" className="theme-btn-1 btn btn-effect-1">
              View Cart
            </a>
            <a href="cart.html" className="theme-btn-2 btn btn-effect-2">
              Checkout
            </a>
          </div>
          <p>Free Shipping on All Orders Over $100!</p>
        </div>
      </div>
    </div>
  );
}

export default UtilizeCart;
