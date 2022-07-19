import React from 'react';
import SideBar from './SideBar';
import AdminHome from './AdminHome';
import styled from "styled-components";

const Container=styled.div`
    display: flex;
    margin-top: 10px;
`


export default function AdminLanding() {
  return (
    <Container>
      <SideBar></SideBar>
      <AdminHome></AdminHome>
    </Container>
  )
}
