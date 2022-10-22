import React, { useEffect } from "react";
import "./cart.scss";
import { Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { publicRequest } from "../../../redux/slice/requestMethods";
import StripeCheckout from "react-stripe-checkout";
import { removeToCart } from "../../../redux/admin/cartRedux";
import formatMoney from "../../../utils/formatMoney";
import { AiFillDelete } from "react-icons/ai";
import { persistor } from "../../../redux/store";

const KEY = process.env.STRIPE_CHECKOUT_KEY;
function CartPage() {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const user = useSelector((state) => state.user.currentUser);

  const cart = useSelector((state) => state.cart);
  console.log(cart.products);

  const quantity = useSelector((state) => state.cart.quantity);
  const [stripeToken, setStripeToken] = React.useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post("/api/payment/checkout", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <div className="cart-container">
      <Row>
        <Col span={16}>
          <div className="cart-content">
            <div>
              <Row>
                <Col span={15}>
                  <p>{<Button>CONTINUE SHOPPING</Button>}</p>
                </Col>
                <Col span={7}>
                  <p style={{ textDecoration: "underline" }}>
                    Shopping Bag (1)
                  </p>
                </Col>
              </Row>
            </div>
            {cart.products.map((product, index) => {
              return (
                <div className="cart-item" key={index}>
                  <Row>
                    <Col span={5}>
                      <p>
                        <img
                          style={{ width: "130px", height: "120px" }}
                          src={`${product.image}`}
                          alt=""
                        />
                      </p>
                    </Col>
                    <Col span={8}>
                      <p style={{ fontSize: "17px", fontWeight: "600" }}>
                        {product.name}
                      </p>
                      <p className="cart-size">
                        <span style={{ fontSize: "17px", fontWeight: "600" }}>
                          Size:{" "}
                        </span>
                        <span>{product.size}</span>
                      </p>
                      <p className="cart-color">
                        <span style={{ fontSize: "17px", fontWeight: "600" }}>
                          Color:{" "}
                        </span>
                        <span>{product.color}</span>
                      </p>
                    </Col>
                    <Col span={4}>
                      <p>Quantity: {product.quantity}</p>
                    </Col>
                    <Col span={4}>
                      <p>{formatMoney(product.price * product.quantity)}</p>
                    </Col>
                    <Col span={2}>
                      <AiFillDelete
                        onClick={() => {
                          dispatch(removeToCart(product._id));
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={8}>
          <p style={{ textAlign: "center" }}>
            <Button>CHECKOUT NOW</Button>
          </p>
          <div className="checkout">
            <div className="checkout-block">
              <h1>ORDER SUMMARY</h1>
              <Row>
                <Col span={19}>Subtotal</Col>
                <Col span={5}>{formatMoney(cart.total)}</Col>
              </Row>
              <Row>
                <Col span={19}>Estimated Shipping</Col>
                <Col span={5}>{formatMoney(10000)}</Col>
              </Row>
              <Row>
                <Col span={19}>Shipping Discount</Col>
                <Col span={5}>{formatMoney(-10000)}</Col>
              </Row>
              <Row>
                <Col span={19}>
                  <p style={{ fontSize: "18px", fontWeight: "600" }}>Total</p>
                </Col>
                <Col span={5}>{formatMoney(cart.total)}</Col>
              </Row>
              <p>
                <StripeCheckout
                  stripeKey="pk_test_51LuSmgFM8EO2eXZPJlk3HrFiHKHSZ8LqSnDSwgRpaiVdRXcqlP7nmSUgS0z4qmfcGKdhoL9YPMo9hFC87g0daOXQ00LI3rqfOr"
                  name="Pro-Shop"
                  image="https://res.cloudinary.com/dgnxqygxv/image/upload/v1666175894/logo_h1ikej.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is € ${formatMoney(cart.total)}`}
                  amount={formatMoney(cart.total) * 100}
                  token={onToken}
                >
                  <Button type="primary" danger size="large">
                    START PAYING
                  </Button>
                </StripeCheckout>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
