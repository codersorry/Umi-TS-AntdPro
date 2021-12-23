import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const LineChart = () => {
  // 折线图 start
  // const [data, setData] = useState([]);
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setData(json);
  //       console.log(json);
  //     })
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };

  const data = [
    {
      month: '1月',
      value: 100,
      category: '全宗数',
    },
    {
      month: '1月',
      value: 88,
      category: '卷数',
    },
    {
      month: '2月',
      value: 200,
      category: '全宗数',
    },
    {
      month: '2月',
      value: 155,
      category: '卷数',
    },
    {
      month: '3月',
      value: 210,
      category: '全宗数',
    },
    {
      month: '3月',
      value: 360,
      category: '卷数',
    },
    {
      month: '4月',
      value: 88,
      category: '全宗数',
    },
    {
      month: '4月',
      value: 350,
      category: '卷数',
    },
    {
      month: '5月',
      value: 360,
      category: '全宗数',
    },
    {
      month: '5月',
      value: 666,
      category: '卷数',
    },
    {
      month: '6月',
      value: 333,
      category: '全宗数',
    },
    {
      month: '6月',
      value: 450,
      category: '卷数',
    },
    {
      month: '7月',
      value: 99,
      category: '全宗数',
    },
    {
      month: '7月',
      value: 52,
      category: '卷数',
    },
    {
      month: '8月',
      value: 66,
      category: '全宗数',
    },
    {
      month: '8月',
      value: 222,
      category: '卷数',
    },
    {
      month: '9月',
      value: 111,
      category: '全宗数',
    },
    {
      month: '9月',
      value: 85,
      category: '卷数',
    },
    {
      month: '10月',
      value: 45,
      category: '全宗数',
    },
    {
      month: '10月',
      value: 230,
      category: '卷数',
    },
    {
      month: '11月',
      value: 99,
      category: '全宗数',
    },
    {
      month: '11月',
      value: 222,
      category: '卷数',
    },
    {
      month: '12月',
      value: 351,
      category: '全宗数',
    },
    {
      month: '12月',
      value: 222,
      category: '卷数',
    },
  ];

  // useEffect(() => {
  //   //获取折线图数据
  //   asyncFetch();
  // }, []);
  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
    },
    yAxis: {

    },
  };
  //折线图 end

  return <Line {...config} />;
};

export default LineChart;
