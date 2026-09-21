import axiosClient from "./axiosClient";

export const contactApi = {
  send: (data) => axiosClient.post("/contact", data),
  getAll: () => axiosClient.get("/contact"),
  update: (id, data) => axiosClient.put(`/contact/${id}`, data),
  remove: (id) => axiosClient.delete(`/contact/${id}`),
};
