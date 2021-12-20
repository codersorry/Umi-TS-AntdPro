export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: 'home',
                icon: 'HomeOutlined',
                component: '@/pages/Menu/Home',
              },
              {
                path: '/tablecreate',
                name: 'tablecreate',
                icon: 'ToolOutlined',
                component: '@/pages/Menu/BaseTableCreate',
              },
              {
                path: '/tablesend',
                name: 'tablesend',
                icon: 'SendOutlined',
                component: '@/pages/Menu/BaseTableSend',
              },
              {
                path: '/tableview',
                name: 'tableview',
                icon: 'FileSearchOutlined',
                component: '@/pages/Menu/BaseTableView',
              },
              {
                path: '/system',
                name: 'system',
                icon: 'SettingOutlined',
                // component: '@/pages/Menu/System',
                routes: [
                  {
                    path: '/system/usermanage',
                    name: 'usermanage',
                    icon: 'FileSearchOutlined',
                    component: '@/pages/Menu/System/UserManage',
                  },
                  {
                    path: '/system/rolemanage',
                    name: 'rolemanage',
                    icon: 'FileSearchOutlined',
                    component: '@/pages/Menu/System/RoleManage',
                  },
                  {
                    path: '/system/authmanage',
                    name: 'authmanage',
                    icon: 'FileSearchOutlined',
                    component: '@/pages/Menu/System/AuthManage',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
