import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Modal, Row, Space, message } from 'antd';

import { addTable } from '@/services/baseTableCreate';

const CreateModal = (props) => {
  const { isModalVisible, isShowModal, actionRef } = props;
  //发送请求，新增数据
  const createTable = async (values) => {
    console.log(values);
    const response = await addTable(values);
    if (response.status === 200) {
      message.success('添加成功');
      //刷新表格数据
      actionRef.current?.reload();
      //关闭弹窗
      isShowModal(false);
    } else {
      message.error('添加失败');
      isShowModal(false);
    }
  };
  return (
    <Modal
      destroyOnClose={true}
      footer={null}
      title="新增"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
    >
      <ProForm
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        // {...formItemLayout}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Space className="subBtn">{doms}</Space>
              </Row>
            );
          },
        }}
        onFinish={async (values) => createTable(values)}
      >
        <ProFormText
          width="md"
          name="name"
          label="名称"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
        <ProFormSelect
          width="md"
          options={[
            {
              value: '2020',
              label: '2020',
            },
            {
              value: '2021',
              label: '2021',
            },
            {
              value: '2022',
              label: '2022',
            },
          ]}
          name="year"
          label="年份"
          rules={[{ required: true, message: '请选择年份' }]}
        />
        <ProFormText
          width="md"
          name="note"
          label="备注"
          placeholder="请输入备注"
          rules={[{ required: true, message: '请输入备注' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateModal;
