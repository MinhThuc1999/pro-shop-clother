import { Button, Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import formatMoney from "../../../../utils/formatMoney";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../../redux/admin/apiCall";
import { userRequest } from "../../../../redux/slice/requestMethods";
import "./productManager.scss";
import ModelAddProduct from "../../components/ModelProduct/ModelAddProduct";
import ModelEditProduct from "../../components/ModelProduct/ModelEditProduct";
function ProductManager() {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await userRequest.get("api/products");
      try {
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };
  const createProduct = () => {};
  const handleUpdate = (data) => {
    setCurrentProduct(data);
    setIsModalOpen(!isModalOpen);
  };
  const handleHideModelProduct = () => {
    setIsModalOpen(!isModalOpen);
    setIsModalAddOpen(!isModalAddOpen);
  };
  const handleHideModelAddProduct = () => {
    setIsModalAddOpen(!isModalAddOpen);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ALL PRODUCT</h1>
      <Button
        style={{ marginBottom: "20px" }}
        type="primary"
        onClick={() => {
          setIsModalAddOpen(!isModalAddOpen);
        }}
      >
        NEW Product
      </Button>

      <ModelAddProduct
        isModalOpen={isModalAddOpen}
        toggleHandleModel={handleHideModelAddProduct}
        createProduct={createProduct}
      />

      {isModalOpen && (
        <ModelEditProduct
          toggleHandleModel={handleHideModelProduct}
          currentProduct={currentProduct}
        />
      )}
      <table id="customers">
        <thead>
          <tr>
            <th>STT</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>IMAGE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{formatMoney(product.price)}</td>
              <td>{product.category}</td>
              <td style={{ width: "100px", height: "100px" }}>
                <img
                  style={{ width: "100%" }}
                  src={`${product.image}`}
                  alt=""
                ></img>
              </td>

              <td>
                <span style={{ paddingRight: "20px" }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleUpdate(product);
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
                      handleDelete(product._id);
                    }}
                  >
                    Delete
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination defaultCurrent={1} total={products.length / 3} pageSize={3} />
    </div>
  );
}

export default ProductManager;
