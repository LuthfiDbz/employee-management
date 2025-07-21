import axiosInstance from './axiosInstance';

const employeeApi = {
  getEmployee: () => axiosInstance.get("/employee"),
  // getUserDetail: (id: number) => axiosInstance.get(endpoints.user.detail(id)),
  // createUser: (data: any) => axiosInstance.post(endpoints.user.create, data),
  // updateUser: (id: number, data: any) =>
  //   axiosInstance.put(endpoints.user.detail(id), data),
  // deleteUser: (id: number) => axiosInstance.delete(endpoints.user.detail(id)),
};

export default employeeApi;
