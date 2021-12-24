import React from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const LeftTree = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <Tree
      blockNode={true}
      showLine={{ showLeafIcon: false }}
      switcherIcon={<DownOutlined />}
      defaultExpandAll={true}
      onSelect={onSelect}
      treeData={[
        {
          title: '全部',
          key: '0',
          children: [
            {
              title: '立档单位1',
              key: '0-0',
              children: [
                {
                  title: '下属单位1',
                  key: '0-0-0',
                },
                {
                  title: '下属单位2',
                  key: '0-0-1',
                },
                {
                  title: '下属单位3',
                  key: '0-0-2',
                },
              ],
            },
            {
              title: '立档单位2',
              key: '0-1',
              children: [
                {
                  title: '下属单位1',
                  key: '0-1-0',
                },
                {
                  title: '下属单位2',
                  key: '0-1-1',
                },
              ],
            },
            {
              title: '立档单位3',
              key: '0-2',
              children: [
                {
                  title: '下属单位1',
                  key: '0-2-0',
                },
                {
                  title: '下属单位2',
                  key: '0-2-1',
                },
                {
                  title: '下属单位3',
                  key: '0-2-2',
                },
                {
                  title: '下属单位4',
                  key: '0-2-3',
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};

export default LeftTree;
