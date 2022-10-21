import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../../../../redux/admin/apiCall";
import { userRequest } from "../../../../redux/slice/requestMethods";
import formatMoney from "../../../../utils/formatMoney";
import "./orderManager.scss";
function OrderManager() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [currentOrder, setCurrentOrder] = React.useState([]);

  useEffect(() => {
    const getOrder = async () => {
      const res = await userRequest.get("api/orders");
      try {
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleUpdate = () => {};
  const handleDelete = () => {};
  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>STT</th>
            <th>NAME CUSTOMER</th>
            <th>PAYMENTMETHOD</th>
            <th>AMOUNT</th>
            <th>ADDRESS</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.user.username}</td>
              <td>{order.paymentMethod}</td>
              <td>{formatMoney(order.amount)}</td>
              <td>
                {order.address.city} , {order.address.country}{" "}
              </td>
              <td>{order.status}</td>

              <td>
                <span style={{ paddingRight: "20px" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleUpdate(order);
                    }}
                  >
                    Edit
                  </Button>
                </span>
                <span>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleDelete(order._id);
                    }}
                  >
                    Delete
                  </Button>
                </span>
                <span>
                  <Button
                    type="text"
                    danger
                    onClick={() => {
                      handleDelete(order._id);
                    }}
                  >
                    Detail
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManager;
