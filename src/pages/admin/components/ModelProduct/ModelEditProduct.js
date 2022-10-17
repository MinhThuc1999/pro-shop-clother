import React from "react";
import "./modelProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePrd, updateProduct } from "../../../../redux/admin/apiCall";
import { Modal, Select } from "antd";

function ModelEditProduct({ toggleHandleModel, currentProduct, editProduct }) {
  const [inputs, setInputs] = React.useState({});
  const [cat, setCat] = React.useState([]);
  const [clr, setClr] = React.useState([]);
  const [sz, setSz] = React.useState([]);

  const produc = useSelector((state) =>
    state.productAdmin.products.find(
      (product) => product._id === currentProduct._id
    )
  );

  console.log(produc);

  const dispatch = useDispatch();

  const handleClick = async () => {
    const editProduct = {
      ...inputs,
      category: cat,
      color: clr,
      size: sz,
    };
    try {
      await updateProduct(produc._id, editProduct, dispatch);
    } catch (error) {}
  };
  const handleCat = (e) => {
    setCat(e.target.value);
  };
  const handleClr = (e) => {
    setClr(e.target.value.split(","));
  };
  const handleSz = (e) => {
    setSz(e.target.value.split(","));
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <Modal
        title="Add Product"
        open={true}
        onOk={toggleHandleModel}
        onCancel={toggleHandleModel}
      >
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product Details</h1>
          </div>
          <div className="productBottom">
            <div className="productForm">
              <div className="productFormLeft">
                <div className="productUpload">
                  <img src={produc.image} alt="" className="productUploadImg" />
                </div>
                <div className="editProductItem">
                  <label>Name</label>
                  <input
                    defaultValue={produc.name}
                    type="text"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="editProductItem">
                  <label>Description</label>
                  <textarea
                    type="text"
                    defaultValue={produc.desc}
                    name="desc"
                    onChange={handleChange}
                  />
                </div>
                <div className="editProductItem">
                  <label>Price</label>
                  <input
                    type="number"
                    defaultValue={produc.price}
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="editProductItem">
                  <label>Categories</label>
                  <select
                    name="category"
                    defaultValue={produc.category}
                    style={{ color: "grey" }}
                    onChange={handleCat}
                  >
                    <option value="default" disabled>
                      Pick Category
                    </option>
                    <option value="coat">Áo khoát</option>
                    <option value="jeans">Quần Jeans</option>
                    <option value="men's shirts">áo sơ mi nam</option>
                    <option value="sportsClothing">quần áo thể thao</option>
                  </select>
                </div>
                <div className="editProductItem">
                  <label>Color</label>
                  <input
                    name="color"
                    type="text"
                    defaultValue={produc.color}
                    onChange={handleClr}
                  />
                </div>
                <div className="editProductItem">
                  <label>Size</label>
                  <input
                    name="size"
                    type="text"
                    defaultValue={produc.size}
                    onChange={handleSz}
                  />
                </div>
                <div className="editProductItem">
                  <label>InStock</label>

                  <select
                    defaultValue={produc.inStock}
                    name="inStock"
                    style={{ color: "grey" }}
                    onChange={handleChange}
                    required
                  >
                    <option value={"default"} disabled>
                      Set Status
                    </option>
                    <option value="true">In Stock</option>
                    <option value="false">Out Of Stock</option>
                  </select>
                </div>
                <button className="btnEdit" onClick={() => handleClick()}>
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModelEditProduct;
