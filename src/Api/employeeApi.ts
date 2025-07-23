import axiosInstance from './axiosInstance';

const employeeApi = {
  getEmployee: (params?: any) => axiosInstance.get(`https://dummyjson.com/users`, {
    params: { limit: params?.limit, skip: params?.skip, select: params?.select, sortBy: params?.sortBy, order: 'asc'  },
  }),
  getSearchEmployee: (params?: any) => axiosInstance.get(`https://dummyjson.com/users/search`, {
    params: { limit: params?.limit, skip: params?.skip, select: params?.select, q: params?.search, sortBy: params?.sortBy, order: 'asc' },
  }),
  // getUserDetail: (id: number) => axiosInstance.get(endpoints.user.detail(id)),
  // createUser: (data: any) => axiosInstance.post(endpoints.user.create, data),
  // updateUser: (id: number, data: any) =>
  //   axiosInstance.put(endpoints.user.detail(id), data),
  // deleteUser: (id: number) => axiosInstance.delete(endpoints.user.detail(id)),
};

export default employeeApi;
