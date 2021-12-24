import { message } from 'antd';
import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,

  //自己mock的数据
  'POST /api/auth/login': async (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    await waitTime(2000);
    if (password === 'qwer' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
        access_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkudGVzdFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYwNzUyMDE0MSwiZXhwIjoxNjA3NTIzNzQxLCJuYmYiOjE2MDc1MjAxNDEsImp0aSI6IktVdWFsTmxnOXYzZmlTZHEiLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.BpVdvBjKEhQ2aIZBfkE-SoU2a3UeFkYCKQKh42Ncbio',
        token_type: 'Bearer',
        expires_in: 3600,
      });
      return;
    }
    if (password === 'qwer' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
        access_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkudGVzdFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYwNzUyMDE0MSwiZXhwIjoxNjA3NTIzNzQxLCJuYmYiOjE2MDc1MjAxNDEsImp0aSI6IktVdWFsTmxnOXYzZmlTZHEiLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.BpVdvBjKEhQ2aIZBfkE-SoU2a3UeFkYCKQKh42Ncbio',
        token_type: 'Bearer',
        expires_in: 3600,
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },

  'GET /api/admin/user': {
    id: 1,
    name: '超级管理员',
    email: 'super@a.com',
    phone: null,
    avatar: null,
    avatar_url: '',
    is_locked: 0,
    created_at: '2020-12-22T02:58:08.000000Z',
    updated_at: '2020-12-22T04:32:27.000000Z',
  },

  'GET /api/admin/index': {
    users_count: 7,
    goods_count: 237,
    order_count: 1,
  },

  'POST /api/auth/logout': {
    status: 200,
    message: '请求成功',
  },

  'POST /api/tablecreate/add': {
    status: 200,
    message: '添加成功',
  },

  'PUT /api/tablecreate/edit': {
    status: 200,
    message: '编辑成功',
  },

  'GET /api/tablecreate/gettable': {
    data: [
      {
        id: 1,
        name: '🧐table1',
        note: '🐛table1的备注',
        time: '2001',
      },
      {
        id: 2,
        name: '🧐table2',
        note: '🐛table2的备注',
        time: '2002',
      },
      {
        id: 3,
        name: '🧐table3',
        note: '🐛table3的备注',
        time: '2003',
      },
      {
        id: 4,
        name: '🧐table4',
        note: '🐛table4的备注',
        time: '2004',
      },
      {
        id: 5,
        name: '🧐table5',
        note: '🐛table5的备注',
        time: '2005',
      },
      {
        id: 6,
        name: '🧐table6',
        note: '🐛table6的备注',
        time: '2006',
      },
      {
        id: 7,
        name: '🧐table7',
        note: '🐛table7的备注',
        time: '2007',
      },
      {
        id: 8,
        name: '🧐table8',
        note: '🐛table8的备注',
        time: '2008',
      },
      {
        id: 9,
        name: '🧐table9',
        note: '🐛table9的备注',
        time: '2009',
      },
      {
        id: 10,
        name: '🧐table10',
        note: '🐛table10的备注',
        time: '2010',
      },
      {
        id: 11,
        name: '🧐table11',
        note: '🐛table11的备注',
        time: '2011',
      },
      {
        id: 12,
        name: '🧐table12',
        note: '🐛table12的备注',
        time: '2012',
      },
      {
        id: 13,
        name: '🧐table13',
        note: '🐛table13的备注',
        time: '2013',
      },
      {
        id: 14,
        name: '🧐table14',
        note: '🐛table14的备注',
        time: '2014',
      },
      {
        id: 15,
        name: '🧐table15',
        note: '🐛table15的备注',
        time: '2015',
      },
      {
        id: 16,
        name: '🧐table16',
        note: '🐛table16的备注',
        time: '2016',
      },
      {
        id: 17,
        name: '🧐table17',
        note: '🐛table17的备注',
        time: '2017',
      },
      {
        id: 18,
        name: '🧐table18',
        note: '🐛table18的备注',
        time: '2018',
      },
    ],
    page: 1,
    success: true,
    total: 18,
  },
};
