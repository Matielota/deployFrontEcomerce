import React from 'react'
import Chart from './Chart'
import WidgetSm from './WidgetSm'
import WidgetLg from "./WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethods";
import styled from "styled-components";


const Homes=styled.div`
    flex: 4;
`
const HomeWidgets=styled.div`
    display: flex;
    margin: 20px;
`

export default function AdminHome() {

    const [userStats, setUserStats] = useState([]);
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
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <Homes>

      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </Homes>
  )
}

