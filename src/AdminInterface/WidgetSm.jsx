import React from 'react'
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from '../requestMethods';
import styled from "styled-components";

const WidgetSmStyle = styled.div`
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`
const WidgetSmTitle=styled.span`
    font-size: 22px;
    font-weight: 600;
`
const WidgetSmImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const WidgetSmList= styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const WidgetSmListItem= styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`
const WidgetSmUser= styled.div`
    display: flex;
    flex-direction: column;
`
const WidgetSmUsername = styled.span`
    font-weight: 600;
`
const WidgetSmButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`


export default function WidgetSm() {
const [users, setUsers] = useState([]);

useEffect(() => {
    const getUsers = async () => {
    try {
        const res = await userRequest.get("users/?new=true");
          setUsers(res.data);
    } catch {}
    };
    getUsers();
}, []);

  return (
    <div>
      <WidgetSmStyle>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (
          <WidgetSmListItem key={user._id}>
            <WidgetSmImg
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
            />
            <WidgetSmUser>
              <WidgetSmUsername>{user.username}</WidgetSmUsername>
            </WidgetSmUser>
            <WidgetSmButton>
              <Visibility style={{marginRight:"5px", fontSize: "16px !important"}}/>
              Display
            </WidgetSmButton>
          </WidgetSmListItem>
        ))}
      </WidgetSmList>
      </WidgetSmStyle>
    </div>
    
  )
}
