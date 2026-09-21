import axiosClient from "./axiosClient";

export const serviceApi = {
  getAll: (params) => axiosClient.get("/services", { params }),
  getOne: (idOrSlug) => axiosClient.get(`/services/${idOrSlug}`),
  create: (data) => axiosClient.post("/services", data),
  update: (id, data) => axiosClient.put(`/services/${id}`, data),
  remove: (id) => axiosClient.delete(`/services/${id}`),
};
