import React, { useRef, useState } from 'react';
import { MobileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTable } from '@/services/baseTableCreate';

type GithubIssueItem = {
  name: string;
  time: string;
  note: string;
};

const RightTable = () => {
  //表格ref便于自定义操作表格
  const actionRef = useRef<ActionType>();
  //控制模态框显示和隐藏
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const isShowModal = (show: boolean = false) => {
  //   setIsModalVisible(show);
  // };

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
        <a key="send" onClick={() => isShowModalSend(true)}>
          分发
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<GithubIssueItem>
        scroll={{
          y: 566,
        }}
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
      />
    </>
  );
};

export default RightTable;
