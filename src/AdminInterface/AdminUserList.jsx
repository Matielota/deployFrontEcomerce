import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { deleteUser } from "../redux/apiCalls";
import styled from "styled-components";
import Sidebar from "./SideBar"

const UserList= styled.div`
    flex: 4;
`
const UserListUser= styled.div`
    display: flex;
    align-items: center;
`
const UserListImg= styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const UserListEdit= styled.button`
      border: none;
      border-radius: 10px;
      padding: 5px 10px;
      background-color: #3bb077;
      color: white;
      cursor: pointer;
      margin-right: 20px;
` 
const UserListDelete= styled.div`
      color: red;
      cursor: pointer;
`
const UserListbuttons= styled.button`
      cursor: pointer;
      margin: 20px 20px 20px 20px;
      align-items: flex-end;
`
export default function AdminUserList() {
  console.log("estoy aca")

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
        setData(res.data);
      } catch {}
    };
    getUsers();
  }, []);
const [data, setData] = useState([]);
  const handleDelete = (id) => {
    deleteUser(id);
    window.location.reload()
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 200,
    renderCell: (params) => {
      return (
        <UserListUser>{params.row._id}</UserListUser>
      );
    }, },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminuser/" + params.row._id}>
              <UserListEdit>Edit</UserListEdit>
            </Link>
            <UserListDelete>
            <DeleteOutline
              className="UserListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            </UserListDelete>
          </>
        );
      },
    },
  ];

  return (
    <UserList>
    <Link to="/adminhome">
        <UserListbuttons>Volver</UserListbuttons>
    </Link>
    <DataGrid
        autoHeight {...data}
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
    />
    </UserList>
  );
}
