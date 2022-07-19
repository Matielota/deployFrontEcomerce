import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import {format} from "timeago.js"
import styled from "styled-components";
import "./widgetlg.css"

const WidgetLgs=styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
`
const WidgetLgTitle=styled.h3`
    font-size: 22px;
    font-weight: 600;
`
const WidgetLgTable=styled.table`
    width: 100%;
    border-spacing: 20px;
`
const WidgetLgTh=styled.th`
    text-align: left;
`
const WidgetLgUser=styled.td`
    display: flex;
    align-items: center;
    font-weight: 600;
`
const WidgetLgDate = styled.td`
font-weight: 300;
`
const WidgetLgAmount= styled.td`
font-weight: 300;
`



export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <WidgetLgs>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <tr >
          <WidgetLgTh>Customer</WidgetLgTh>
          <WidgetLgTh>Date</WidgetLgTh>
          <WidgetLgTh>Amount</WidgetLgTh>
          <WidgetLgTh>Status</WidgetLgTh>
        </tr>
        {orders.map((order) => (
          <tr  key={order._id}>
            <WidgetLgUser>
              <span >{order.userId}</span>
            </WidgetLgUser>
            <WidgetLgDate>{format(order.createdAt)}</WidgetLgDate>
            <WidgetLgAmount>${order.amount}</WidgetLgAmount>
            <td >
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </WidgetLgTable>
    </WidgetLgs>
  );
}
