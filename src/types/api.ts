import { AxiosError } from "axios";
import {
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

export type QueryKeyT = [string, object | undefined];

export interface ApiRequestConfig {
  url: string;
  method?: string;
  params?: object;
}

export interface ApiError {
  type: string;
  errors: {
    code: string;
    detail: string;
  }[];
}

export interface ApiHooks {
  useApiQuery: <ResponseData>(
    url: string,
    params?: object,
    options?: Omit<
      UseQueryOptions<ResponseData, AxiosError, ResponseData, QueryKeyT>,
      "queryKey" | "queryFn"
    >
  ) => UseQueryResult<ResponseData, AxiosError>;

  useApiMutation: <ResponseData, RequestData>(
    url: string,
    options?: Omit<
      UseMutationOptions<ResponseData, AxiosError, RequestData>,
      "mutationFn"
    >,
    method?: string
  ) => UseMutationResult<ResponseData, AxiosError, RequestData>;
}
