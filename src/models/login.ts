// import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin, logout } from '@/services/login';
// import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    //发送请求执行登录
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      //登录成功返回状态undefined,失败返回401
      if (response.status === 'ok') {
        //登录成功在进行put
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        //跳转到主页
        message.success('登录成功！');
        history.replace('/');
      }
      if (response.status === 'error') {
        message.error('账号或密码错误');
      }
      // Login successfully
      //请求成功的跳转，可以根据自己的实际状态来写，不用写的这么麻烦
      //根据状态判断成功后在put，然后再跳转到首页，否则return false
      // if (response.status === 'ok') {
      // const urlParams = new URL(window.location.href);
      // const params = getPageQuery();
      // message.success('登录成功！');
      // let { redirect } = params as { redirect: string };
      // if (redirect) {
      //   const redirectUrlParams = new URL(redirect);
      //   if (redirectUrlParams.origin === urlParams.origin) {
      //     redirect = redirect.substr(urlParams.origin.length);
      //     if (window.routerBase !== '/') {
      //       redirect = redirect.replace(window.routerBase, '/');
      //     }
      //     if (redirect.match(/^\/.*#/)) {
      //       redirect = redirect.substr(redirect.indexOf('#') + 1);
      //     }
      //   } else {
      //     window.location.href = '/';
      //     return;
      //   }
      // }
      // history.replace(redirect || '/');
      // }
    },
    //退出登录，删除本地token和userInfo,同时发送请求让服务器端也删除token
    *logout(_, { call }) {
      //请求Api，退出登录
      const response = yield call(logout);

      //判断是否登录成功（根据实际情况填写判断条件）
      if (response.status === 200) {
        //删除本地token和userInfo
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');

        message.success('退出成功！');
        //重定向到登录页
        history.replace('/user/login');
      }
      // const { redirect } = getPageQuery();
      // // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.access_token);
      //将token存入到localStorage
      localStorage.setItem('access_token', payload.access_token);
      return {
        ...state,
      };
    },
  },
};

export default Model;
