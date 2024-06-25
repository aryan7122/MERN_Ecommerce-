import React, { useEffect, useState } from "react";
import { Column, Pie } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  console.log(orderState);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];

    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        income: element?.count,
      });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];

    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
        product: orderState[i].orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        staus: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const totalIncome = yearlyDataState && yearlyDataState[0]?.amount;
  const totalSales = yearlyDataState && yearlyDataState[0]?.count;

  const pieData = [
    { type: 'Total Income', value: totalIncome },
    { type: 'Total Sales', value: totalSales },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <div className="bg-white p-3 rounded-3 shadow-sm h-100">
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">Rs.{totalIncome}</h4>
            <p className="mb-0 desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="bg-white p-3 rounded-3 shadow-sm h-100">
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{totalSales}</h4>
            <p className="mb-0 desc">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <div className="bg-white p-3 rounded-3 shadow-sm">
            <h3 className="title mb-4">Income & Sales Distribution</h3>
            <Pie {...pieConfig} />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="bg-white p-3 rounded-3 shadow-sm">
            <h3 className="title mb-4">Income in Last Year</h3>
            <Column {...config} />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-white p-3 rounded-3 shadow-sm">
            <h3 className="title mb-4">Sales in Last Year</h3>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="bg-white p-3 rounded-3 shadow-sm">
            <h3 className="title mb-4">Recent Orders</h3>
            <Table columns={columns} dataSource={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
