import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/apiCalls";
import styled from "styled-components";
import SideBar from "./SideBar";

const ProductListContainer=styled.div`
    position:relative;
    flex: 2;
    display:grid;
    display: grid;
    grid-template-columns: 10% 1fr;
`
const ProductListItem=styled.div`
    display: flex;
    align-items: center;
`
const ProductListImg=styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const ProductListEdit=styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`
const ProductListDelete=styled.div`
    color: red;
    cursor: pointer;
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

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={params.row.img} alt="" />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminproduct/" + params.row._id}>
              <ProductListEdit>Edit</ProductListEdit>
            </Link>
            <ProductListDelete>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            </ProductListDelete>
          </>
        );
      },
    },
  ];

  return (
    <ProductListContainer>
    <div>
        <SideBar></SideBar>
    </div>
    <div>
      <Link to="/adminnewproduct">
          <ProductAddButton>Create product</ProductAddButton>
        </Link>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </ProductListContainer>
  );
}
