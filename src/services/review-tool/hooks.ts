//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import { AxiosRequestConfig } from 'axios';
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';
import { RequestError, SwaggerResponse } from './config';

import type {
  AssetCommentBodyDto,
  AssetCommentDto,
  AssetCommentEditDto,
  AssetCommentsResponse,
  AssetMoveBodyDto,
  AssetRemoveBodyDto,
  ChatBodyDto,
  ChatDto,
  ChatEditBodyDto,
  ChatResponseDto,
  FileDto,
  FileEditBodyDto,
  FolderBodyDto,
  FolderDto,
  FolderEditBodyDto,
  GetChatIdQueryParams,
  GetProjectIdLogsQueryParams,
  GetProjectsQueryParams,
  ProjectArchivedAssetsDto,
  ProjectAssetEditDto,
  ProjectAssetsResponseDto,
  ProjectBodyDto,
  ProjectCoverDto,
  ProjectDto,
  ProjectEditBodyDto,
  ProjectFileBodyDto,
  ProjectInvitationDto,
  ProjectLogsDto,
  ProjectMemberBodyDto,
  ProjectPathDto,
  ProjectStatusBodyDto,
  ProjectsResponseDto,
  SignInBodyDto,
  SignInResultDto,
  SignUpBodyDto,
  SignUpResultDto,
  SignUpWithTokenBodyDto,
  TokenBodyDto,
  UpdateProjectMemberDto,
  UserDto,
} from './types';
import {
  deleteAssetFileIdCommentCommentId,
  deleteProjectId,
  deleteProjectIdAssets,
  deleteProjectIdMember,
  deleteProjectIdMemberMemberId,
  get,
  getAssetFileId,
  getAssetFileIdComments,
  getAssetFolderId,
  getChatId,
  getProject,
  getProjectId,
  getProjectIdAssets,
  getProjectIdAssetsArchived,
  getProjectIdChats,
  getProjectIdLogs,
  getProjectIdPaths,
  getProjects,
  getUser,
  getUserId,
  patchAssetFileIdCommentCommentId,
  postAssetFileIdComment,
  postAuthSignIn,
  postAuthSignUp,
  postAuthSignUpInvitation,
  postAuthSsoGoogle,
  postAuthVerifyEmail,
  postProject,
  postProjectIdAssetsArchive,
  postProjectIdAssetsMove,
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
  putProjectIdMember,
  putProjectIdStatus,
} from './services';

export type SwaggerTypescriptMutationDefaultParams<TExtra> = {
  _extraVariables?: TExtra;
  configOverride?: AxiosRequestConfig;
};
type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  'queryKey'
>;

type SwaggerTypescriptUseMutationOptions<TData, TRequest, TExtra> = UseMutationOptions<
  SwaggerResponse<TData>,
  RequestError | Error,
  TRequest & SwaggerTypescriptMutationDefaultParams<TExtra>
>;

type SwaggerTypescriptUseMutationOptionsVoid<TData, TExtra> = UseMutationOptions<
  SwaggerResponse<TData>,
  RequestError | Error,
  SwaggerTypescriptMutationDefaultParams<TExtra> | void
>;

export const useDeleteAssetFileIdCommentCommentId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<AssetCommentDto, { id: string; commentId: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        commentId,

        configOverride,
      } = _o || {};

      return deleteAssetFileIdCommentCommentId(
        id,
        commentId,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,

        configOverride,
      } = _o || {};

      return deleteProjectId(
        id,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdAssets = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetRemoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return deleteProjectIdAssets(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,

        configOverride,
      } = _o || {};

      return deleteProjectIdMember(
        id,

        configOverride,
      );
    },
    ...options,
  });
};

export const useDeleteProjectIdMemberMemberId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; memberId: string }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        memberId,

        configOverride,
      } = _o || {};

      return deleteProjectIdMemberMemberId(
        id,
        memberId,

        configOverride,
      );
    },
    ...options,
  });
};

export const useGet = (options?: SwaggerTypescriptUseQueryOptions<any>, configOverride?: AxiosRequestConfig) => {
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
export const useGetAssetFileId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FileDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFileId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssetFileId.key, id] as QueryKey,
    fun: () =>
      getAssetFileId(
        id,

        configOverride,
      ),
  };
};
useGetAssetFileId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FileDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileId.info(
    id,

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
export const useGetAssetFileIdComments = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<AssetCommentsResponse>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdComments.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFileIdComments.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssetFileIdComments.key, id] as QueryKey,
    fun: () =>
      getAssetFileIdComments(
        id,

        configOverride,
      ),
  };
};
useGetAssetFileIdComments.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<AssetCommentsResponse>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFileIdComments.info(
    id,

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
export const useGetAssetFolderId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FolderDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFolderId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetAssetFolderId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getAssetFolderId.key, id] as QueryKey,
    fun: () =>
      getAssetFolderId(
        id,

        configOverride,
      ),
  };
};
useGetAssetFolderId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<FolderDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetAssetFolderId.info(
    id,

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
useGetChatId.info = (id: string, queryParams: GetChatIdQueryParams, configOverride?: AxiosRequestConfig) => {
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
export const useGetProject = (
  options?: SwaggerTypescriptUseQueryOptions<ProjectInvitationDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProject.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProject.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProject.key] as QueryKey,
    fun: () => getProject(configOverride),
  };
};
useGetProject.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<ProjectInvitationDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProject.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetProjectId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectId.key, id] as QueryKey,
    fun: () =>
      getProjectId(
        id,

        configOverride,
      ),
  };
};
useGetProjectId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectId.info(
    id,

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
export const useGetProjectIdAssets = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectAssetsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssets.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdAssets.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdAssets.key, id] as QueryKey,
    fun: () =>
      getProjectIdAssets(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdAssets.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectAssetsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssets.info(
    id,

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
export const useGetProjectIdAssetsArchived = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectArchivedAssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssetsArchived.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdAssetsArchived.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdAssetsArchived.key, id] as QueryKey,
    fun: () =>
      getProjectIdAssetsArchived(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdAssetsArchived.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectArchivedAssetsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdAssetsArchived.info(
    id,

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
export const useGetProjectIdChats = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdChats.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdChats.key, id] as QueryKey,
    fun: () =>
      getProjectIdChats(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdChats.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ChatDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdChats.info(
    id,

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
export const useGetProjectIdLogs = (
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(
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
useGetProjectIdLogs.info = (
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getProjectIdLogs.key, id, queryParams] as QueryKey,
    fun: () =>
      getProjectIdLogs(
        id,

        queryParams,

        configOverride,
      ),
  };
};
useGetProjectIdLogs.prefetch = (
  client: QueryClient,
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectLogsDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdLogs.info(
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
export const useGetProjectIdPaths = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectPathDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdPaths.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjectIdPaths.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getProjectIdPaths.key, id] as QueryKey,
    fun: () =>
      getProjectIdPaths(
        id,

        configOverride,
      ),
  };
};
useGetProjectIdPaths.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<ProjectPathDto[]>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjectIdPaths.info(
    id,

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
export const useGetProjects = (
  queryParams?: GetProjectsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<ProjectsResponseDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetProjects.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetProjects.info = (queryParams?: GetProjectsQueryParams, configOverride?: AxiosRequestConfig) => {
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
  options?: SwaggerTypescriptUseQueryOptions<ProjectsResponseDto>,
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
export const useGetUser = (
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser.key] as QueryKey,
    fun: () => getUser(configOverride),
  };
};
useGetUser.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};
export const useGetUserId = (
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(
    id,

    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUserId.info = (id: string, configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUserId.key, id] as QueryKey,
    fun: () =>
      getUserId(
        id,

        configOverride,
      ),
  };
};
useGetUserId.prefetch = (
  client: QueryClient,
  id: string,
  options?: SwaggerTypescriptUseQueryOptions<UserDto>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUserId.info(
    id,

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
export const usePatchAssetFileIdCommentCommentId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    AssetCommentDto,
    { id: string; commentId: string; requestBody: AssetCommentEditDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        commentId,
        requestBody,

        configOverride,
      } = _o || {};

      return patchAssetFileIdCommentCommentId(
        id,
        commentId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAssetFileIdComment = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    AssetCommentDto,
    { id: string; requestBody: AssetCommentBodyDto },
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

      return postAssetFileIdComment(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostAuthSignIn = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: SignInBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<SignUpResultDto, { requestBody: SignUpBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: SignUpWithTokenBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: TokenBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<SignInResultDto, { requestBody: TokenBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { requestBody: ProjectBodyDto }, TExtra>,
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
    ProjectAssetEditDto,
    { id: string; requestBody: AssetRemoveBodyDto },
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

      return postProjectIdAssetsArchive(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsMove = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetMoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsMove(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdAssetsRestore = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: AssetRemoveBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdAssetsRestore(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdChat = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<any, { id: string; requestBody: ChatBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdChat(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdCover = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectCoverDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdCover(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdFile = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; requestBody: ProjectFileBodyDto },
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

      return postProjectIdFile(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdFolder = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; requestBody: FolderBodyDto },
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

      return postProjectIdFolder(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectMemberBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return postProjectIdMember(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePostUserAvatar = <TExtra,>(options?: SwaggerTypescriptUseMutationOptionsVoid<UserDto, TExtra>) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postUserAvatar(configOverride);
    },
    ...options,
  });
};

export const usePutChatId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ChatDto, { id: string; requestBody: ChatEditBodyDto }, TExtra>,
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
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectEditBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectId(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFileFileId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; fileId: string; requestBody: FileEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        fileId,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFileFileId(
        id,
        fileId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdFolderFolderId = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectAssetEditDto,
    { id: string; folderId: string; requestBody: FolderEditBodyDto },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        folderId,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdFolderFolderId(
        id,
        folderId,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdMember = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    ProjectDto,
    { id: string; requestBody: UpdateProjectMemberDto },
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

      return putProjectIdMember(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

export const usePutProjectIdStatus = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<ProjectDto, { id: string; requestBody: ProjectStatusBodyDto }, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        id,
        requestBody,

        configOverride,
      } = _o || {};

      return putProjectIdStatus(
        id,
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};
