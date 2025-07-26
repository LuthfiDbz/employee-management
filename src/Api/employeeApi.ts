import { BodyModifyEmployee } from '../Interface/Pages/employeeInterface';
import axiosInstance from './axiosInstance';

const employeeApi = {
  getEmployee: (params?: any) => axiosInstance.get(`https://dummyjson.com/users`, {
    params: { limit: params?.limit, skip: params?.skip, select: params?.select, sortBy: params?.sortBy || 'id', order: params?.order || 'desc'  },
  }),
  getSearchEmployee: (params?: any) => axiosInstance.get(`https://dummyjson.com/users/search`, {
    params: { limit: params?.limit, skip: params?.skip, select: params?.select, q: params?.search, sortBy: params?.sortBy || 'id', order: params?.order || 'desc' },
  }),
  addEmployee: (body: BodyModifyEmployee) => axiosInstance.post('https://dummyjson.com/users/add', body),
  updateEmployee: (id: number | string, body: BodyModifyEmployee) => axiosInstance.put(`https://dummyjson.com/users/${id}`, body),
  deleteEmployee: (id: number | string) => axiosInstance.delete(`https://dummyjson.com/users/${id}`),
};

export default employeeApi; 
