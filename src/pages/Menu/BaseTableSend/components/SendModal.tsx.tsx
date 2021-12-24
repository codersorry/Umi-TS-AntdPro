import React from 'react';

import { Modal, Button } from 'antd';

import MyTree from './components/MyTree';

const SendModal = (props) => {
  const { isModalVisibleSend, isShowModalSend } = props;

  return (
    <Modal
      centered={true}
      title="选择立档单位"
      destroyOnClose={true}
      visible={isModalVisibleSend}
      footer={
        <div className="footerStyle">
          <Button key="copy" type="primary" onClick={() => {}}>
            确认分发
          </Button>
          <Button key="cancel" onClick={() => isShowModalSend(false)}>
            取消
          </Button>
        </div>
      }
      onCancel={() => isShowModalSend(false)}
    >
      <MyTree />
    </Modal>
  );
};

export default SendModal;
