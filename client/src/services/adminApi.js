import axiosClient from "./axiosClient";

export const adminApi = {
  getDashboard: () => axiosClient.get("/admin/dashboard"),
  getBookings: (params) => axiosClient.get("/bookings", { params }),
  getCustomers: (params) => axiosClient.get("/admin/customers", { params }),
  getCustomer: (id) => axiosClient.get(`/admin/customers/${id}`),
  toggleCustomer: (id, data) => axiosClient.put(`/admin/customers/${id}`, data),
};
