import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Statistic, Col } from 'antd';

const Card = () => {
  return (
    <>
      <Col xs={24} sm={12} md={12} lg={8} xl={4}>
        <ProCard title="本年度上报情况" split="vertical" bordered headerBordered>
          <ProCard title="" colSpan="50%">
            <Statistic title="总数" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
          <ProCard title="">
            <Statistic title="通过" value={98} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="未通过" value={1} valueStyle={{ color: '#cf1322' }} />
          </ProCard>
        </ProCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={4}>
        <ProCard title="档案情况" split="vertical" bordered headerBordered>
          <ProCard title="" colSpan="50%">
            <Statistic title="全宗数" value={99} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="档案卷数" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
          <ProCard title="">
            <Statistic title="档案件数" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
        </ProCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={4}>
        <ProCard title="立档单位" split="vertical" bordered headerBordered>
          <ProCard title="" colSpan="50%">
            <Statistic title="立档单位" value={99} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="下属单位" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
        </ProCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={4}>
        <ProCard title="基础设施" split="vertical" bordered headerBordered>
          <ProCard title="" colSpan="50%">
            <Statistic title="库房面积" value={99} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="办公用房" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
          <ProCard title="">
            <Statistic title="整理用房" value={99} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="阅览用房" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
        </ProCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={4}>
        <ProCard title="人员情况" split="vertical" bordered headerBordered>
          <ProCard title="" colSpan="50%">
            <Statistic title="在编人数" value={99} valueStyle={{ color: '#3f8600' }} />
            <Statistic title="平均年限" value={99} valueStyle={{ color: '#3f8600' }} />
          </ProCard>
        </ProCard>
      </Col>
    </>
  );
};

export default Card;
