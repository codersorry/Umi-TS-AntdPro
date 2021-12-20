import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';
import { Statistic, Row, Col } from 'antd';
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Line, Pie, measureTextWidth, Column } from '@ant-design/charts';
// import { fetchDashboard } from '@/services/home';

const Home = () => {
  //折线图 start
  const [data, setData] = useState([]);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    //获取折线图数据
    asyncFetch();
    let demoData;
    // const getDemoData = async () => {
    //   await fetchDashboard().then((d) => {
    //     return (demoData = d);
    //   });
    // };
    console.log(demoData);
  }, []);

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };
  //这线图 end

  //环图 start
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  const data1 = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config1 = {
    appendPadding: 10,
    data: data1,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        //@ts-ignore
        customHtml: (container, view, datum, data5) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `¥ ${datum.value}` : `¥ ${data5.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  //环图 end

  //柱状图 start
  const data2 = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config2 = {
    data: data2,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  //柱状图 end

  return (
    <div className="site-statistic-demo-card">
      {/* 栅格之间的间隔 [左右间隔, 上下间隔] */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProCard
            title="本年度上报情况"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="" colSpan="50%">
              <Statistic
                title="总数"
                value={99}
                //小数点精确位数
                // precision={2}
                valueStyle={{ color: '#3f8600' }}
                //数字前面添加icon
                // prefix={<ArrowUpOutlined />}
                //数字后面添加符号，如：%
                // suffix="%"
              />
            </ProCard>
            <ProCard title="">
              <Statistic title="通过" value={98} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="未通过" value={1} valueStyle={{ color: '#cf1322' }} />
            </ProCard>
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          {/* <Col span={6}> */}
          <ProCard
            title="档案情况"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="" colSpan="50%">
              <Statistic title="全宗数" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="档案卷数" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
            <ProCard title="">
              <Statistic title="档案件数" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProCard
            title="立档单位"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="">
              <Statistic title="立档单位" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="下属单位" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProCard
            title="基础设施"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="" colSpan="50%">
              <Statistic title="库房总数" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="办公用房" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
            <ProCard title="">
              <Statistic title="整理用房" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="阅览用房" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
          </ProCard>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProCard
            title="人员情况"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="">
              <Statistic title="在编人数" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="平均干部年限" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
          </ProCard>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProCard
            title="接口测试数据"
            extra={<a href="#">More</a>}
            split="vertical"
            bordered
            headerBordered
          >
            <ProCard title="" colSpan="50%">
              <Statistic title="用户数" value={99} valueStyle={{ color: '#3f8600' }} />
              <Statistic title="商品数" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
            <ProCard title="">
              <Statistic title="订单数" value={99} valueStyle={{ color: '#3f8600' }} />
            </ProCard>
          </ProCard>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <Line {...config} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <Pie {...config1} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <Column {...config2} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
