//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import { AxiosRequestConfig } from "axios";
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { RequestError, SwaggerResponse } from "./config";

import type {
  AssetRemoveBodyDto,
  ChatBodyDto,
  ChatDto,
  ChatEditBodyDto,
  ChatResponseDto,
  FileEditBodyDto,
  FolderBodyDto,
  FolderEditBodyDto,
  GetChatIdQueryParams,
  GetProjectIdLogsQueryParams,
  GetProjectsQueryParams,
  ProjectBodyDto,
  ProjectDto,
  ProjectEditBodyDto,
  ProjectLogsDto,
  ProjectMemberBodyDto,
  ProjectStatusBodyDto,
  SignInBodyDto,
  SignInResultDto,
  SignUpBodyDto,
  SignUpResultDto,
  SignUpWithTokenBodyDto,
  TokenBodyDto,
  UserDto,
} from "./types";
import {
  deleteProjectId,
  deleteProjectIdAssets,
  deleteProjectIdMember,
  deleteProjectIdMemberMemberId,
  get,
  getChatId,
  getProjectId,
  getProjectIdChats,
  getProjectIdLogs,
  getProjects,
  getUserId,
  postAuthSignIn,
  postAuthSignUp,
  postAuthSignUpInvitation,
  postAuthSsoGoogle,
  postAuthVerifyEmail,
  postProject,
  postProjectIdAssetsArchive,
  postProjectIdAssetsRestore,
  postProjectIdChat,
  postProjectIdCover,
  postProjectIdFile,
  postProjectIdFolder,
  postProjectIdMember,
  postUserAvatar,
  putChatId,
  putProjectId,
  putProjectIdFileFileId,
  putProjectIdFolderFolderId,
  putProjectIdStatus,
} from "./services";

export type SwaggerTypescriptMutationDefaultParams<TExtra> = {
  _extraVariables?: TExtra;
  configOverride?: AxiosRequestConfig;
};
type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  "queryKey"
>;

type SwaggerTypescriptUseMutationOptions<TData, TRequest, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    TRequest & SwaggerTypescriptMutationDefaultParams<TExtra>
  >;

type SwaggerTypescriptUseMutationOptionsVoid<TData, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    SwaggerTypescriptMutationDefaultParams<TExtra> | void
  >;

export const useDeleteProjectId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<ProjectDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return deleteProjectId(configOverride);
    },
    ...options,
  });
};

export const useDeleteProjectIdAssets = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: AssetRemoveBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return deleteProjectIdAssets(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<ProjectDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return deleteProjectIdMember(configOverride);
    },
    ...options,
  });
};

export const useDeleteProjectIdMemberMemberId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<ProjectDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return deleteProjectIdMemberMemberId(configOverride);
    },
    ...options,
  });
};

export const useGet = (
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGet.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGet.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [get.key] as QueryKey,
    fun: () => get(configOverride),
  };
};
useGet.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGet.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetChatId = (
  id: string,
  queryParams: GetChatIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ChatResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatId.info(
    id,

    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetChatId.info = (
  id: string,
  queryParams: GetChatIdQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getChatId.key, id, queryParams] as QueryKey,
    fun: () =>
      getChatId(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetChatId.prefetch = (
  client: QueryClient,
  id: string,
  queryParams: GetChatIdQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ChatResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetChatId.info(
    id,

    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjectId = (
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectId.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectId.key] as QueryKey,
    fun: () => getProjectId(configOverride),
  };
};
useGetProjectId.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjectIdChats = (
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdChats.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdChats.key] as QueryKey,
    fun: () => getProjectIdChats(configOverride),
  };
};
useGetProjectIdChats.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjectIdLogs = (
  queryParams: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdLogs.info = (
  queryParams: GetProjectIdLogsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getProjectIdLogs.key, queryParams] as QueryKey,
    fun: () =>
      getProjectIdLogs(
        queryParams,

        configOverride,
      ),
  };
};
useGetProjectIdLogs.prefetch = (
  client: QueryClient,
  queryParams: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjects = (
  queryParams?: GetProjectsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjects.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjects.info = (
  queryParams?: GetProjectsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getProjects.key, queryParams] as QueryKey,
    fun: () =>
      getProjects(
        queryParams,

        configOverride,
      ),
  };
};
useGetProjects.prefetch = (
  client: QueryClient,
  queryParams?: GetProjectsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<any>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjects.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetUserId = (
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserId.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserId.key] as QueryKey,
    fun: () => getUserId(configOverride),
  };
};
useGetUserId.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const usePostAuthSignIn = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    SignInResultDto,
    { requestBody: SignInBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignIn(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignUp = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    SignUpResultDto,
    { requestBody: SignUpBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignUp(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignUpInvitation = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    SignInResultDto,
    { requestBody: SignUpWithTokenBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSignUpInvitation(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSsoGoogle = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    SignInResultDto,
    { requestBody: TokenBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthSsoGoogle(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthVerifyEmail = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    SignInResultDto,
    { requestBody: TokenBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postAuthVerifyEmail(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProject = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: ProjectBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProject(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsArchive = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: AssetRemoveBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsArchive(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsRestore = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: AssetRemoveBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsRestore(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdChat = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    any,
    { requestBody: ChatBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdChat(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdCover = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<ProjectDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postProjectIdCover(configOverride);
    },
    ...options,
  });
};

export const usePostProjectIdFile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<ProjectDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postProjectIdFile(configOverride);
    },
    ...options,
  });
};

export const usePostProjectIdFolder = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: FolderBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdFolder(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: ProjectMemberBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdMember(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostUserAvatar = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<UserDto, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postUserAvatar(configOverride);
    },
    ...options,
  });
};

export const usePutChatId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ChatDto,
    { id: string; requestBody: ChatEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putChatId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: ProjectEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectId(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFileFileId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: FileEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFileFileId(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFolderFolderId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: FolderEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFolderFolderId(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdStatus = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { requestBody: ProjectStatusBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdStatus(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};
