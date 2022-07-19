import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Container = styled.div`
  text-decoration: none;
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;


const Logo = styled.h1`
  text-decoration: none;
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const FilterContainer = styled.div`
  postion: relative
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSelect = styled.select`
  margin-left: 10px;
  padding: 5px;
`;


const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector(state=>state.cart.quantity)
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  const navigate = useNavigate()
  const onChange = (e)=>{
    e.preventDefault();
    if(e.target.value !== "all"){
    navigate(`/products/${e.target.value}`)}
  }
  const onclick=()=>{
    localStorage.clear();
    swal({
      title: "Se cerro la sesion correctamente",
      text: "Lo esperamos pronto",
    });
    window.location.reload()
  }
  
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo>Matielotas Shop</Logo>
        </Link>
        <Right>
          <span> categorias:</span>
          <FilterContainer>
            <FilterSelect onChange={onChange}>
              <option value="all" >All</option>
              <option value="mujeres" >women</option>
              <option value="hombres">man</option>
              <option value="niños" >kids</option>
            </FilterSelect>
          </FilterContainer>
          <FilterContainer>
            <FilterSelect onChange={onChange}>
              <option value="all" >All</option>
              <option value="vestido">Dress</option>
              <option value="jean">Jeans</option>
              <option value="camisa" >Shirt</option>
              <option value="remera" >T-Shirt</option>
              <option value="short" >Short</option>
              <option value="sueter" >Sweater</option>
              <option value="deportivo" >Sports</option>
              <option value="campera" >Jackets</option>
              <option value="gala" >White tier</option>
              <option value="zapatillas" >Sneakers</option>
            </FilterSelect>
          </FilterContainer>
          {!user?
          <Link to="/register">
          <MenuItem>REGISTER</MenuItem>
          </Link>:null
          }
          {user?
            <MenuItem onClick={onclick}>LOG OUT</MenuItem>
          :
          <Link to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          }
          {admin?
          <Link to="/adminhome">
            <MenuItem>Admin Interface</MenuItem>
          </Link>
          :null
          }
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
