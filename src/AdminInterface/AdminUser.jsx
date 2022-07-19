import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { editUser } from "../redux/apiCalls";
import styled from "styled-components";

const Users =styled.div`
    flex: 4;
    padding: 20px;
`
const UserContainer=styled.div`
    display: flex;
    margin-top: 20px;
` 
const UserTitleContainer =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
  
const UserAddButton =styled.div`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;
`
const UserUpdate=styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`
  
const UserUpdateTitle=styled.span`
      font-size: 24px;
      font-weight: 600;
`
  
const UserUpdateForm=styled.form`
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
`
  
const UserUpdateItem=styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 10px;
`
  
const UserUpdateItemlabel =styled.label`
      margin-bottom: 5px;
      font-size: 14px;
`
  
const UserUpdateInput =styled.input`
      border: none;
      width: 250px;
      height: 30px;
      border-bottom: 1px solid gray;
`
  
const UserUpdateButton=styled.div`
      border-radius: 5px;
      border: none;
      padding: 5px;
      cursor: pointer;
      background-color: darkblue;
      color: white;
      font-weight: 600;
`



  
  export default function AdminUser() {
    const [user, setUser] = useState({});
    const {userId}= useParams();
  
  
    useEffect(() => {
      const getUsers = async () => {
        try {
          const res = await userRequest.get(`users/find/${userId}`);
          setUser(res.data);
        } catch {}
      };
      getUsers();
    }, [userId]);
  
    const [input, setInput]= useState({
      id: userId,
      name:user.name,
      username: user.username,
      lastName:user.lastName,
      email: user.email
    })
    function handleChange(e){
      setInput({
          ...input,
          [e.target.name] : e.target.value
      }) 
  }
  
  const onSubmit = (e) =>{
    e.preventDefault()
    setInput({
      id: userId,
      name:"",
      username:"",
      lastName:"",
      email:""
    })
    editUser(input)
    window.location.reload()
    
  
  }
  
    return (
    
      <Users>
        <UserTitleContainer>
          <h1>Edit User</h1>
          <Link to="/adminhome">
            <UserAddButton>volver</UserAddButton>
          </Link>
        </UserTitleContainer>
        <UserContainer>
          <UserUpdate>
            <UserUpdateTitle>Edit</UserUpdateTitle>
            <UserUpdateForm>
                <UserUpdateItem>
                  <UserUpdateItemlabel>Username</UserUpdateItemlabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user.username}
                    value={input.username}
                    name="username"
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemlabel>Name</UserUpdateItemlabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user.name}
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemlabel>Last Name</UserUpdateItemlabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user.lastName}
                    value={input.lastName}
                    name="lastName"
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemlabel>Email</UserUpdateItemlabel>
                  <UserUpdateInput
                    type="text"
                    placeholder={user.email}
                    value={input.email}
                    name="email"
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateButton onClick={onSubmit}>Update</UserUpdateButton>
            </UserUpdateForm>
          </UserUpdate>
        </UserContainer>
      </Users>
  
    );
  }
  