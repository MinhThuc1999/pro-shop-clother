import React from "react";
import "./modelProduct.scss";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Alert } from "antd";

import uploadApi from "../../../../redux/admin/uploadApi";
import { addProduct } from "../../../../redux/admin/apiCall";
import Loader from "../../../../components/GlobalStyles/Loader.js";

function ModelAddProduct({ toggleHandleModel, createProduct, isModalOpen }) {
  const [product, setProduct] = React.useState([]);
  const [inputs, setInputs] = React.useState({});
  const [image, setImage] = React.useState(null);
  const [cat, setCat] = React.useState([]);
  const [clr, setClr] = React.useState([]);
  const [sz, setSz] = React.useState([]);
  const dispatch = useDispatch();
  const { scc, error } = useSelector((state) => state.productAdmin);
  const [err, setError] = React.useState(error);
  const [sc, setSuccess] = React.useState(scc);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(false);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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

  const onFinish = async () => {
    const newProduct = {
      ...inputs,
      image: image,
      category: cat,
      color: clr,
      size: sz,
    };
    try {
      if (newProduct === null) {
        setError(true);
      } else {
        setSuccess(true);
        await addProduct(newProduct, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    setUploading(true);
    setUploadError(false);
    try {
      const { data } = await uploadApi.uploadImage(formData);
      setImage(data.secure_url);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setUploadError("Lỗi khi tải ảnh lên");
    }
  };
  return (
    <div>
      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={toggleHandleModel}
        onCancel={toggleHandleModel}
      >
        <div className="newProduct">
          <form className="addProductForm">
            <div className="addProductItem">
              <label>link image</label>
              <input
                defaultValue={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Upload</label>
              <input
                type="file"
                id="file"
                onChange={uploadFileHandler}
                style={{ cursor: "pointer" }}
                required
              />
              {uploading && <Loader />}
              {uploadError && <Alert message={uploadError} type="error" />}
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <textarea
                name="desc"
                type="text"
                placeholder="Product Description"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="Product Price"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Categories</label>

              <select
                name="category"
                defaultValue={"default"}
                style={{ color: "grey" }}
                onChange={handleCat}
                required
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
            <div className="addProductItem">
              <label>Color</label>
              <input
                type="text"
                placeholder="Product Color"
                onChange={handleClr}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Size</label>
              <input
                type="text"
                placeholder="Product Size"
                onChange={handleSz}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Stock</label>

              <select
                defaultValue={"default"}
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
            {err ? (
              <>
                <button onClick={onFinish} className="addProductButton">
                  {" "}
                  Add Product{" "}
                </button>
                <span style={{ marginLeft: "10px" }}>Empty Fields !</span>
              </>
            ) : sc ? (
              <>
                <button onClick={onFinish} className="addProductButton">
                  Add Product
                </button>
                <span style={{ marginLeft: "10px" }}>
                  Product Added Successfully
                </span>
              </>
            ) : (
              <button onClick={onFinish} className="addProductButton">
                Add Product
              </button>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModelAddProduct;
