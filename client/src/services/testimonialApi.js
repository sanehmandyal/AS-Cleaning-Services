import axiosClient from "./axiosClient";

export const testimonialApi = {
  getAll: (params) => axiosClient.get("/testimonials", { params }),
  create: (data) => axiosClient.post("/testimonials", data),
  update: (id, data) => axiosClient.put(`/testimonials/${id}`, data),
  remove: (id) => axiosClient.delete(`/testimonials/${id}`),
};
