import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BodyTypes, Model } from "./types";

const API_URL = "http://localhost:3000";

export const useApiQuery = (model: string, params?: object) => {
  return useQuery({
    queryKey: [model],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${model}`, { params });
      return data;
    },
  });
};

export const useApiMutation = (
  model: Model,
  options?: {
    method: "post" | "patch" | "delete";
  },
) => {
  const { method = "post" } = options || {};
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [model],
    mutationFn: async (mutationData?: {
      data?: BodyTypes;
      params?: string;
    }) => {
      const { data, params } = mutationData || {};
      const url = `${API_URL}/${model}` + (params ? params : "");
      const response = await axios[method](
        url,
        data && method === "post" ? { ...data } : undefined,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [model],
      });
    },
  });
};
