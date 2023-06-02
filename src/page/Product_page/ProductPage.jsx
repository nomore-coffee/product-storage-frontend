import React, { useEffect, useState } from "react";
import "./productpage.css";
import data from "../../tempdata";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { getProductApi, saveProductApi } from "../../services/api";
import { getProductData } from "../../Redux/Action/dataAction";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  let [activeProduct, setActiveProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [productData, SetproductData] = useState([]);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProduct();
  }, []);
  let getAllProduct = async () => {
    const getProduct = await getProductApi();
    console.log(getProduct.data);
    setActiveProduct(getProduct.data[0]);
    SetproductData(getProduct.data);
    dispatch(getProductData(getProduct.data));
  };
  let handleClick = (productName) => {
    console.log(productName);
    productData.map((name, i) => {
      if (name.productName === productName) {
        setActiveProduct(name);
      }
    });
  };
  const handleOpen = () => {
    console.log("sdsad");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInputs({});
    getAllProduct();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    if (inputs.pricePerQuantityGross && inputs.VAT) {
      let totalppqn = Math.round(
        (inputs.pricePerQuantityGross / inputs.VAT) * 100
      );
      setInputs((values) => ({
        ...values,
        ["pricePerQuantityNet"]: totalppqn,
      }));
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("sdadsa", inputs);
    const saveproduct = await saveProductApi(inputs);
    handleClose();
    // alert(inputs);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="main_page">
      <div className="box">
        <div className="header">Product Data</div>
        <div className="col-container">
          <div className="col1" style={{ marginLeft: "50px" }}>
            <div
              className="col1-headers"
              style={{
                fontSize: "50 px",
                fontWeight: "bolder",
                padding: "10px",
              }}
            >
              Products
            </div>
            <div className="addButton" onClick={() => handleOpen()}>
              <button
                onClick={handleOpen}
                style={{
                  backgroundColor: "White",
                  border: "2px  solid black",
                  borderRadius: "2px",
                  fontSize: "medium",
                  cursor: "cell",
                }}
              >
                + Add
              </button>
            </div>

            <div className="col1-container">
              <div
                className="name"
                style={{
                  marginTop: "20px",
                  borderTop: "2px solid black",
                  borderRight: "2px solid black",
                  borderLeft: "2px solid black",
                  fontWeight: "bolder",
                }}
              >
                Product Name
              </div>
              {productData.length > 0
                ? productData.map((name, i) => (
                    <div
                      className="table"
                      style={{
                        display: "grid",
                        justifyContent: "start",
                        padding: "10px",
                        borderTop: "2px solid black",
                        borderRight: "2px solid black",
                        borderLeft: "2px solid black",
                      }}
                    >
                      <table>
                        <thead
                          onClick={() => {
                            handleClick(name.productName);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {name.productName}
                        </thead>
                      </table>
                    </div>
                  ))
                : "NO PRODUCT"}
            </div>
          </div>
          <div className="col2">
            <div
              className="co2-header"
              style={{ textAlign: "center", padding: "10px" }}
            >
              Item Detail
            </div>

            <div className="col2-container" style={{ textAlign: "center" }}>
              <div
                className="descriptionTable"
                style={{
                  marginTop: "60px",
                  padding: "10px",
                  display: "grid",
                  justifyContent: "center",
                }}
              >
                <div className="editbtn">
                  <div
                    style={{
                      border: "2px solid black",
                      width: "3vw",
                      marginBottom: "10px",
                      backgroundColor: "yellow",
                    }}
                  >
                    Edit
                  </div>
                </div>
                {Object.entries(activeProduct).map(([key, value]) => (
                  <table
                    style={{
                      borderTop: "2px solid black",
                      borderLeft: "2px solid black",
                      borderRight: "2px solid black",
                      padding: "2px",
                      width: "31vw",
                    }}
                  >
                    <thead>
                      <div className="destable">
                        <div className="desckey" style={{ textAlign: "left" }}>
                          {key}
                        </div>
                        <div className="descvalue">{value}</div>
                      </div>
                    </thead>
                  </table>
                ))}
              </div>
              {inputs ? console.log(inputs) : console.log("nodata")}
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="formheader">
            <div className="text">NEW PRODUCT</div>
            <div className="crossButton" onClick={() => handleClose()}>
              <CancelIcon />
            </div>
          </div>
          <div className="formbody">
            <div className="body1">
              <table style={{ display: "grid", gap: "20px" }}>
                <thead>Product Name:</thead>
                <thead>Price Per Quantity Gross:</thead>
                <thead>Vats:</thead>
                <thead>Price Per Quantity Net:</thead>
                <thead>Total Stock:</thead>
                <thead>Upload:</thead>
              </table>
            </div>
            <div className="body2">
              <form onSubmit={handleSubmit} className="productform">
                <label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={inputs.productName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    type="number"
                    placeholder="Price Per Quanutty Gross"
                    name="pricePerQuantityGross"
                    value={inputs.pricePerQuantityGross}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    placeholder="Vat"
                    type="number"
                    name="VAT"
                    value={inputs.VAT}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    type="number"
                    placeholder="Price Per Quantity Net"
                    name="pricePerQuantityNet"
                    value={inputs.pricePerQuantityNet}
                    onChange={handleChange}
                    disabled
                  />
                </label>
                <label>
                  <input
                    type="number"
                    placeholder="Total Stock"
                    name="totalStocks"
                    value={inputs.totalStocks}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    value={inputs.image}
                    onChange={handleChange}
                  />
                </label>
                <div
                  className="button"
                  style={{ display: "grid", justifyContent: "end" }}
                >
                  <input type="submit" className="submitButton" />
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductPage;
