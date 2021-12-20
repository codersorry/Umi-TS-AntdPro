import axios from 'axios';
// 安装axios的同时会同步安装qs包 https://www.npmjs.com/package/qs
import qs from 'qs';
import isObject from 'lodash/isObject';
import pickBy from 'lodash/pickBy';
import { message } from 'antd';
import { getUrlParam, trim } from '@vtx/utils';

// 默认30秒超时
const SECOND = 30;
const MILL_SECOND = 1000;

const { token } = getUrlParam();

/**
 * 基于 axios 封装的请求封装
 * axios文档 http://www.axios-js.com/zh-cn/docs/
 * 支持 Get 和 Post 请求
 */
let instance: any;
const _createAxios = (options: any) => {
  console.log(22, options);
  // 创建实例
  let instanceItem = axios.create({
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: MILL_SECOND * SECOND,
    headers: {
      //Authorization: token ? `Bearer ${token}` : '',
      'Cache-Control': 'no-cache',
    },
    ...options,
  });
  instanceItem.interceptors.response.use(_responseHandler, _errorHandler);
  instance = instanceItem;
};

/**
 * 响应数据的处理
 * @param {*} response
 */
const _responseHandler = (response: any) => {
  console.log(response);
  const { status, data, statusText } = response;
  if (status >= 200 && status < 300) {
    if (data.code === 0) {
      return data;
    } else {
      message.error(data.msg || '请求信息错误');
      return;
    }
  }
  const error = new Error(statusText);
  error.response = response;
  throw error;
};

/**
 * 请求错误处理
 * @param {*} error
 */
const _errorHandler = (error: any) => {
  if (error.response) {
    let msg;
    switch (error.response.status) {
      case 404:
        msg = '接口请求不存在！错误码【404】。';
        break;
      case 500:
        msg = '服务端应用接口异常！错误码【500】。';
        break;
      default:
        msg = '请求错误，请检查或刷新重试！';
        break;
    }
    message.error(msg);
  } else {
    message.error('服务不可用');
  }
};

export const http: any = {
  /**
   * get 请求
   * @param {*} url
   * @param {*} options {body}
   */
  get: (url: any, options = {}) => {
    _createAxios(options);
    const { body = {} }: any = options;
    // 过滤掉值为 '' || undefined || null 的对象属性
    const postData = isObject(body)
      ? pickBy(trim(body), function (value: any) {
          return value !== '' && value !== undefined && value !== null;
        })
      : {};

    return instance.get(url, {
      params: {
        ...postData,
        token,
      },
    });
  },

  /**
   * post 请求
   * @param {*} url
   * @param {*} options
   */
  post: (url: any, options = {}) => {
    _createAxios(options);
    const { body = {}, extraHeader = {} }: any = options;
    const data = isObject(body) ? qs.stringify(trim(body)) : trim(JSON.parse(body));
    return instance.post(url, data, {
      headers: extraHeader ? { operation: extraHeader.msg } : {},
      params: {
        token,
      },
    });
  },
  delete: (url: any, options = {}) => {
    _createAxios(options);
    const { body = {}, extraHeader = {} }: any = options;
    const data = isObject(body) ? qs.stringify(trim(body)) : trim(JSON.parse(body));
    return instance.delete(`${url}?token=${token}`, data, {
      headers: extraHeader ? { operation: extraHeader.msg } : {},
      params: {
        token,
      },
    });
  },
};
