import React from 'react';
import { Modal, message, Button } from 'antd';

const MobileInput = (props) => {
  const { isModalVisible, isShowModal } = props;

  //复制剪切板
  function copy() {
    const transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = 'www.baidu.com'; // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    transfer.blur();
    message.success('复制成功');
    document.body.removeChild(transfer);
  }
  return (
    <Modal
      centered={true}
      title="手机端填写"
      destroyOnClose={true}
      visible={isModalVisible}
      footer={
        <div className="footerStyle">
          <Button key="copy" type="primary" onClick={() => copy()}>
            复制链接
          </Button>

          <Button key="cancel" onClick={() => isShowModal(false)}>
            取消
          </Button>
        </div>
      }
      onCancel={() => isShowModal(false)}
    >
      <h3>移动端地址：www.baidu.com</h3>
      <h4>请复制地址发到微信群里面填报</h4>
    </Modal>
  );
};

export default MobileInput;
