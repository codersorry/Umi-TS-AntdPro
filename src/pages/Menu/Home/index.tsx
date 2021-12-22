import React from 'react';
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// import { fetchDashboard } from '@/services/home';
import { Row, Col } from 'antd';
import { Card, LineChart, RingChart, ColumnChart } from './components';

const Home = () => {
  return (
    <div>
      {/* 栅格之间的间隔 [左右间隔, 上下间隔] */}
      <Row justify="space-around" gutter={[16, 16]}>
        <Card />
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 50 }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <LineChart />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <RingChart />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <ColumnChart />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
