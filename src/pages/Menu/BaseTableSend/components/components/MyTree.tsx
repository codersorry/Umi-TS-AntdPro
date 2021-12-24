import React, { useState } from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    title: '全部',
    key: '0',
    children: [
      {
        title: '立档单位1',
        key: '0-0',
        children: [
          { title: '下属单位1', key: '0-0-0' },
          { title: '下属单位2', key: '0-0-1' },
          { title: '下属单位3', key: '0-0-2' },
        ],
      },
      {
        title: '立档单位2',
        key: '0-1',
        children: [
          { title: '下属单位1', key: '0-1-0' },
          { title: '下属单位2', key: '0-1-1' },
          { title: '下属单位3', key: '0-1-2' },
        ],
      },
      {
        title: '立档单位2',
        key: '0-2',
        children: [
          { title: '下属单位1', key: '0-2-0' },
          { title: '下属单位2', key: '0-2-1' },
          { title: '下属单位3', key: '0-2-2' },
        ],
      },
    ],
  },
];

const Mytree = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0', '0-1', '0-2']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      //节点前添加 Checkbox 复选框
      checkable
      //展开/收起节点时触发
      onExpand={onExpand}
      //（受控）展开指定的树节点
      expandedKeys={expandedKeys}
      //是否自动展开父节点
      autoExpandParent={autoExpandParent}
      //点击复选框触发
      onCheck={onCheck}
      //（受控）选中复选框的树节点
      checkedKeys={checkedKeys}
      //	点击树节点触发
      onSelect={onSelect}
      //（受控）设置选中的树节点
      selectedKeys={selectedKeys}
      //treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
      treeData={treeData}
    />
  );
};

export default Mytree;
