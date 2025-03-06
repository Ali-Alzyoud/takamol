import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiClient } from "../api/client";

type QueryKeyT = [string, object | undefined];

export const useApi = () => {
  const fetcher = async <ResponseData>({
    url,
    method = "GET",
    params,
  }: {
    url: string;
    method?: string;
    params?: object;
  }): Promise<ResponseData> => {
    const response = await apiClient.request({
      url,
      method,
      params,
    });
    return response.data;
  };

  const useApiQuery = <ResponseData>(
    url: string,
    params?: object,
    options?: Omit<
      UseQueryOptions<ResponseData, AxiosError, ResponseData, QueryKeyT>,
      "queryKey" | "queryFn"
    >
  ) => {
    return useQuery<ResponseData, AxiosError, ResponseData, QueryKeyT>({
      queryKey: [url, params],
      queryFn: () => fetcher<ResponseData>({ url, params }),
      ...options,
    });
  };

  const useApiMutation = <ResponseData, RequestData>(
    url: string,
    options?: Omit<
      UseMutationOptions<ResponseData, AxiosError, RequestData>,
      "mutationFn"
    >,
    method = "POST"
  ) => {
    return useMutation<ResponseData, AxiosError, RequestData>({
      mutationFn: (data: RequestData) =>
        fetcher<ResponseData>({
          url,
          method,
          params: data as object,
        }),
      ...options,
    });
  };

  return {
    useApiQuery,
    useApiMutation,
  };
};
