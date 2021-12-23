import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import { getTable } from '@/services/baseTableCreate';

import './index.less';

//控制弹窗内元素样式
// type LayoutType = Parameters<typeof ProForm>[0]['layout'];
// const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const BaseTableCreate = () => {
  //页面加载前请求Table数据
  // useEffect(() => {

  // }, [])

  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //编辑id
  const [record, setRecord] = useState(undefined);
  //控制弹出框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  //控制模态框显示和隐藏
  const isShowModal = (show: boolean = false) => {
    setIsModalVisible(show);
  };
  const isShowModalEdit = (show: boolean = false, record) => {
    setIsModalVisibleEdit(show);
    setRecord(record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    //全选
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
      // copyable: true,
      // ellipsis: true,
      // tip: '标题过长会自动收缩',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '此项为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      // valueType: 'dateTime',
      // sorter: true,
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

            isShowModalEdit(true, record);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          制作
        </a>,
        <a style={{ color: 'red' }}>删除</a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
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
        pagination={{
          pageSize: 12,
        }}
        dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            onClick={() => isShowModal(true)}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
      <CreateModal
        actionRef={actionRef}
        isModalVisible={isModalVisible}
        isShowModal={isShowModal}
      />
      {/* 根据模态框是否显示决定动态加载编辑模态框组件 */}
      {!isShowModalEdit ? (
        ''
      ) : (
        <EditModal
          actionRef={actionRef}
          isModalVisibleEdit={isModalVisibleEdit}
          isShowModalEdit={isShowModalEdit}
          record={record}
        />
      )}
    </>
  );
};

export default BaseTableCreate;
