import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { LaptopWindows } from "@material-ui/icons";

const NewProductContainer=styled.div`
    flex: 4;
    margin-left: 100px;
`
  
const AddProductForm=styled.form`
    margin-top: 10px;
`
  
const AddProductItem=styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`
  
const AddProductItemlabel=styled.label`
    color: gray;
    font-weight: 600;
    margin-bottom: 10px;
`
  
const AddProductIteminput=styled.input`
    padding: 10px;
`
  
const AddProductItemselect=styled.select`
    padding: 10px;
`
  
const AddProductButton=styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
    background-color: green;
    color: white;
    font-weight: 600;
    cursor: pointer;
`
  

export default function AdminNewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

   
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, size: size, color: color };
          addProduct(product, dispatch);
          window.location = "https://deploy-front-ecomerce.vercel.app/adminproducts"
        });
      }
    );
  };

  return (
    <NewProductContainer>
      <h1>New Product</h1>
      <AddProductForm>
        <AddProductItem>
          <AddProductItemlabel>Image</AddProductItemlabel>
          <AddProductIteminput
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Title</AddProductItemlabel>
          <AddProductIteminput
            name="title"
            type="text"
            placeholder="title product"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Description</AddProductItemlabel>
          <AddProductIteminput
            name="desc"
            type="text"
            placeholder="description product"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Price</AddProductItemlabel>
          <AddProductIteminput
            name="price"
            type="number"
            placeholder="5000"
            onChange={handleChange}
          />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Categories</AddProductItemlabel>
          <AddProductIteminput type="text" placeholder="jeans, shirt, sweater" onChange={handleCat} />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Color</AddProductItemlabel>
          <AddProductIteminput type="text" placeholder="yellow,red" onChange={handleColor} />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Size</AddProductItemlabel>
          <AddProductIteminput type="text" placeholder="l, xl" onChange={handleSize} />
        </AddProductItem>
        <AddProductItem>
          <AddProductItemlabel>Stock</AddProductItemlabel>
          <AddProductItemselect name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </AddProductItemselect>
        </AddProductItem>
        <AddProductButton onClick={handleClick}>
          Create
        </AddProductButton>
      </AddProductForm>
    </NewProductContainer>
  );
}
