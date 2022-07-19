import {
    LineStyle,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    ChatBubbleOutline,
    ArrowBack
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Sidebars = styled.div` 
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`
const SidebarWrapper=styled.div`
    padding: 20px;
    color: #555;
`
const SidebarMenu= styled.div`
    margin-bottom: 10px;
`
const SidebarTitle= styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`
const SidebarList=styled.ul`
    list-style: none;
    padding: 5px;
`
const SidebarListItem= styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    text-decoration: none
`



  export default function SideBar() {
    return (
      <Sidebars>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarTitle>Dashboard</SidebarTitle>
            <SidebarList>
              <Link to="/adminhome" style={{textDecoration: "none"}}>
              <SidebarListItem>
                <LineStyle style={{marginRight:"5px", fontSize: "20px !important"}}/>
                Home
              </SidebarListItem>
              </Link>
              <SidebarListItem>
                <TrendingUp style={{marginRight:"5px", fontSize: "20px !important"}}/>
                Sales
              </SidebarListItem>
            
              <Link to="/adminusers" className="link">
                <SidebarListItem>
                  <PermIdentity style={{marginRight:"5px", fontSize: "20px !important"}} />
                  Users
                </SidebarListItem>
              </Link>
              <Link to="/adminproducts" className="link">
                <SidebarListItem>
                  <Storefront style={{marginRight:"5px", fontSize: "20px !important"}} />
                  Products
                </SidebarListItem>
              </Link>
              <SidebarListItem>
                <AttachMoney style={{marginRight:"5px", fontSize: "20px !important"}} />
                Transactions
              </SidebarListItem>
              <SidebarListItem>
                <ChatBubbleOutline style={{marginRight:"5px", fontSize: "20px !important"}} />
                Messages
              </SidebarListItem>
              <Link to="/" className="link">
              <SidebarListItem>
                <ArrowBack style={{marginRight:"5px", fontSize: "20px !important"}} />
                Volver a la tienda
              </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
        </SidebarWrapper>
      </Sidebars>
    );
  }
  