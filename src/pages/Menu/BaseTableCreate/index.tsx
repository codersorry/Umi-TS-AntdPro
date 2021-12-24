import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/baseTableCreate';
import CreateOrEdit from './components/CreateOrEdit';

import './index.less';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const BaseTableCreate = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //编辑id
  const [record, setRecord] = useState(undefined);
  //控制模态框显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isShowModal = (show: boolean = false, getRecord = undefined) => {
    setIsModalVisible(show);
    setRecord(getRecord);
  };

  //确认删除
  function confirm() {
    Modal.confirm({
      centered: true,
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: '删除基本信息表将会把已有分发和填写数据一并收回，请谨慎操作！',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '年份',
      dataIndex: 'year',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            isShowModal(true, record);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="create">
          制作
        </a>,
        <a key="copy">复制</a>,
        <a
          key="delete"
          style={{ color: 'red' }}
          onClick={() => {
            confirm();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
        tableClassName="tableStyle"
        options={false}
        rowSelection={{}}
        columns={columns}
        actionRef={actionRef}
        request={async () => getTable()}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        //分页的配置
        pagination={{
          pageSize: 12,
          size: 'default',
          //指定每页可以显示多少条
          pageSizeOptions: ['12', '24', '48', '96'],
        }}
        dateFormatter="string"
        headerTitle={
          <Button
            onClick={() => isShowModal(true)}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新增
          </Button>
        }
        // toolBarRender={() => [
        //   <Button
        //     onClick={() => isShowModal(true)}
        //     key="button"
        //     icon={<PlusOutlined />}
        //     type="primary"
        //   >
        //     新增
        //   </Button>,
        // ]}
      />
      {/* 根据模态框是否显示决定动态加载编辑模态框组件，为了触发子组件生命周期 */}
      {!isShowModal ? (
        ''
      ) : (
        <CreateOrEdit
          actionRef={actionRef}
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          record={record}
        />
      )}
    </>
  );
};

export default BaseTableCreate;
