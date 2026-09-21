import axiosClient from "./axiosClient";

export const bookingApi = {
  create: (data) => axiosClient.post("/bookings", data),
  getAll: (params) => axiosClient.get("/bookings", { params }),
  getOne: (id) => axiosClient.get(`/bookings/${id}`),
  update: (id, data) => axiosClient.put(`/bookings/${id}`, data),
  remove: (id) => axiosClient.delete(`/bookings/${id}`),
};
