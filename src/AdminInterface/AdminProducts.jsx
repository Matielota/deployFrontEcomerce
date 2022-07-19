import { Link, useLocation } from "react-router-dom";
import Chart from "./Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import SideBar from "./SideBar";

const Product=styled.div`
position:relative;
flex: 2;
display:grid;
display: grid;
grid-template-columns: 10% 1fr;
padding: 20px;
`
const ProductTitleContainer=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ProductAddButton=styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`
const ProductTop=styled.div`
    display: flex;
`
const ProductTopRight=styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    flex: 1;
`
const ProductInfoImg=styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`
const ProductInfoTop=styled.div`
    display: flex;
    align-items: center;
`
const ProductInfoItem=styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`
const ProductInfoValue=styled.span`
    font-weight: 300;
`
const ProductBottom=styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const ProductForm=styled.form`
    display: flex;
    justify-content: space-between;
`
const ProductFormLeft=styled.div`
    display: flex;
    flex-direction: column;
` 
const ProductFormLeftlabel=styled.label`
    margin-bottom: 10px;
    color: gray;
` 
const ProductFormLeftinput=styled.input`
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
` 
const ProductFormLeftselect=styled.select`
    margin-bottom: 10px;
` 
const ProductUploadImg=styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`
const ProductFormRight=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductUpload=styled.div`
    display: flex;
    align-items: center;
` 
const ProductButton=styled.div`
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color:white;
    font-weight: 600;
    cursor: pointer;
`
export default function AdminProducts() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <Product>
        <div>
    <SideBar></SideBar>
        </div>
        <div>
      <ProductTitleContainer>
        <h1>Product</h1>
        <Link to="/adminnewproduct">
          <ProductAddButton>Create</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <div style={{flex: "1"}}>
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg src={product.img} alt=""/>
            <span style={{fontWeight: "600"}}>{product.title}</span>
          </ProductInfoTop>
          <div style={{marginTop: "10px"}}>
            <ProductInfoItem>
              <span className="productInfoKey">id:</span>
              <ProductInfoValue>{product._id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">sales:</span>
              <ProductInfoValue>5123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <span className="productInfoKey">in stock:</span>
              <ProductInfoValue>{product.inStock}</ProductInfoValue>
            </ProductInfoItem>
          </div>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <ProductFormLeftlabel>Product Name</ProductFormLeftlabel>
            <ProductFormLeftinput type="text" placeholder={product.title} />
            <ProductFormLeftlabel>Product Description</ProductFormLeftlabel>
            <ProductFormLeftinput type="text" placeholder={product.desc} />
            <ProductFormLeftlabel>Price</ProductFormLeftlabel>
            <ProductFormLeftinput type="text" placeholder={product.price} />
            <ProductFormLeftlabel>In Stock</ProductFormLeftlabel>
            <ProductFormLeftselect name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </ProductFormLeftselect>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg src={product.img} alt=""/>
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </ProductUpload>
            <ProductButton>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </div>
    </Product>
  );
}

