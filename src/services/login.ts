import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
};
//执行登录,获取token
export async function fakeAccountLogin(params: LoginParamsType) {
  const newParams = { email: params.userName, password: params.password };
  console.log(newParams);
  return request('/auth/login', {
    method: 'POST',
    data: newParams,
  });
}

//退出登录
export async function logout() {
  return request.post('/auth/logout');
}
