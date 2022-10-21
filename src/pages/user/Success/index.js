import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Result } from "antd";
import { clearToCart } from "../../../redux/admin/cartRedux";
import { userRequest } from "../../../redux/slice/requestMethods";
import "./success.scss";
function Success() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.stripeData;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = React.useState(null);
  const [error, setError] = React.useState("");
  const paymentMethod = data.payment_method_details.type;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/api/order", {
          user: currentUser._id,
          orderDetails: cart.products.map((item) => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          paymentMethod: paymentMethod,
          amount: cart.total,
          address: data.billing_details.address,
          status: data.status,
        });
        setOrderId(res.data._id);
      } catch (error) {
        setError(error.res.data.message || error.message);
      }
    };
    data && createOrder();
  }, [data, cart, currentUser]);

  return (
    <div>
      {orderId ? (
        <Result
          status="success"
          title={"Order has been created successfully."}
          subTitle={`Your order number is ${orderId}`}
          extra={[
            <Link to={"/"}>
              <Button type="primary">Go to Shopping</Button>
            </Link>,
            <Link to={"/cart"}>
              <Button type="default">Buy Again</Button>
            </Link>,
          ]}
        />
      ) : (
        <Result
          status="500"
          title="500"
          subTitle={error}
          extra={
            <Link to={"/cart"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}

export default Success;
