import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../api";
import { ApiHooks, ApiRequestConfig, QueryKeyT } from "../types/api";

export const useApi = (): ApiHooks => {
  const fetcher = async <ResponseData>({
    url,
    method = "GET",
    params,
  }: ApiRequestConfig): Promise<ResponseData> => {
    const response = await api.request({
      url,
      method,
      params,
    });
    return response.data;
  };

  const useApiQuery: ApiHooks["useApiQuery"] = <ResponseData>(
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

  const useApiMutation: ApiHooks["useApiMutation"] = <
    ResponseData,
    RequestData
  >(
    url: string,
    options?: Omit<
      UseMutationOptions<ResponseData, AxiosError, RequestData>,
      "mutationFn"
    >,
    method = "POST"
  ) => {
    return useMutation<ResponseData, AxiosError, RequestData>({
      mutationFn: (data) =>
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
  } as ApiHooks;
};
