import React, { useEffect } from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Modal, Row, Space, message, Button } from 'antd';

import { addTable } from '@/services/baseTableCreate';
import { updateTable } from '@/services/baseTableCreate';

const CreateOrEdit = (props) => {
  //props获取的数据： 控制模态框开启的值/是否打开模态框函数/操作表格的引用/record
  const { isModalVisible, isShowModal, actionRef, record } = props;
  const type = record ? '编辑' : '新增';
  //提交触发的事件
  const handleSubmit = async (values) => {
    let response;
    if (record) {
      //发送编辑请求
      response = await updateTable(record.id, values);
    } else {
      //发送新增请求
      response = await addTable(values);
    }
    if (response.status === 200) {
      message.success(`${type}成功`);
      //刷新表格数据
      actionRef.current?.reload();
      //关闭弹窗
      isShowModal(false);
    } else {
      message.error(`${type}失败`);
      isShowModal(false);
    }
  };

  return (
    <Modal
      destroyOnClose={true}
      footer={null}
      title={`${type}`}
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
    >
      <ProForm
        initialValues={record}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        // {...formItemLayout}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Space className="subBtn">
                  {record
                    ? [
                        <Button key="save" type="primary" htmlType="submit">
                          保存
                        </Button>,
                        <Button key="cancel" onClick={() => isShowModal(false)}>
                          取消
                        </Button>,
                      ]
                    : [
                        <Button key="create_and_edit" type="primary" htmlType="submit">
                          创建并编辑
                        </Button>,
                        <Button key="cancel" onClick={() => isShowModal(false)}>
                          取消
                        </Button>,
                      ]}
                </Space>
              </Row>
            );
          },
        }}
        onFinish={async (values) => handleSubmit(values)}
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
          name="time"
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

export default CreateOrEdit;
