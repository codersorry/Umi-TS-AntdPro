import request from '@/utils/request';

export type addParamsType = {
  name: string;
  year: string;
  note: string;
};

//获取Table列表
export async function getTable(){
  return request('/tablecreate/gettable')
}

//新增Table
export async function addTable(params: addParamsType) {
  return request.post('/tablecreate/add', { params });
}

//编辑Table
export async function updateTable(editId: number, params: addParamsType) {
  return request.put(`/tablecreate/edit/${editId}`, { params });
}
