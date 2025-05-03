//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import type { AxiosRequestConfig } from 'axios';
import type { SwaggerResponse } from './config';
import { Http } from './httpRequest';
//@ts-ignore
import qs from 'qs';
import type {
  GetProjectIdLogsQueryParams,
  GetProjectsQueryParams,
  GetChatIdQueryParams,
  UserDto,
  SignUpBodyDto,
  SignUpResultDto,
  SignUpWithTokenBodyDto,
  SignInResultDto,
  SignInBodyDto,
  TokenBodyDto,
  ProjectBodyDto,
  ProjectDto,
  ProjectEditBodyDto,
  ProjectInvitationDto,
  ProjectAssetsResponseDto,
  ProjectCoverDto,
  ProjectStatusBodyDto,
  ProjectMemberBodyDto,
  UpdateProjectMemberDto,
  ProjectFileBodyDto,
  FolderDto,
  ProjectAssetEditDto,
  FileEditBodyDto,
  FolderBodyDto,
  FolderEditBodyDto,
  ProjectPathDto,
  AssetRemoveBodyDto,
  ProjectArchivedAssetsDto,
  ChatBodyDto,
  ChatDto,
  ProjectLogsDto,
  AssetMoveBodyDto,
  ProjectsResponseDto,
  ChatResponseDto,
  ChatEditBodyDto,
  FileDto,
  AssetCommentBodyDto,
  AssetCommentDto,
  AssetCommentsResponse,
  AssetCommentEditDto,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(config?: AxiosRequestConfig, configOverride?: AxiosRequestConfig): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
  Object.keys(obj).forEach((key) => {
    const re = new RegExp(`{${key}}`, 'i');
    path = path.replace(re, obj[key]);
  });

  return path;
}

function isFormData(obj: any) {
  // This checks for the append method which should exist on FormData instances
  return (
    (typeof obj === 'object' && typeof obj.append === 'function' && obj[Symbol.toStringTag] === undefined) ||
    obj[Symbol.toStringTag] === 'FormData'
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  if (isFormData(requestBody)) {
    return requestBody;
  }
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToUrlencoded(requestBody: object) {
  return qs.stringify(requestBody);
}

export const deleteAssetFileIdCommentCommentId = (
  id: string,
  commentId: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<AssetCommentDto>> => {
  return Http.deleteRequest(
    template(deleteAssetFileIdCommentCommentId.key, { id, commentId }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteAssetFileIdCommentCommentId.key = '/asset/file/{id}/comment/{commentId}';

export const deleteProjectId = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    template(deleteProjectId.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectId.key = '/project/{id}';

export const deleteProjectIdAssets = (
  id: string,
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    template(deleteProjectIdAssets.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdAssets.key = '/project/{id}/assets';

export const deleteProjectIdMember = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    template(deleteProjectIdMember.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdMember.key = '/project/{id}/member';

export const deleteProjectIdMemberMemberId = (
  id: string,
  memberId: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    template(deleteProjectIdMemberMemberId.key, { id, memberId }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdMemberMemberId.key = '/project/{id}/member/{memberId}';

export const get = (configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(get.key, undefined, undefined, undefined, overrideConfig(_CONSTANT0, configOverride));
};

/** Key is end point string without base url */
get.key = '/';

export const getAssetFileId = (id: string, configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<FileDto>> => {
  return Http.getRequest(
    template(getAssetFileId.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAssetFileId.key = '/asset/file/{id}';

export const getAssetFileIdComments = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<AssetCommentsResponse>> => {
  return Http.getRequest(
    template(getAssetFileIdComments.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAssetFileIdComments.key = '/asset/file/{id}/comments';

export const getAssetFolderId = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<FolderDto>> => {
  return Http.getRequest(
    template(getAssetFolderId.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getAssetFolderId.key = '/asset/folder/{id}';

export const getChatId = (
  id: string,
  queryParams: GetChatIdQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ChatResponseDto>> => {
  return Http.getRequest(
    template(getChatId.key, { id }),
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getChatId.key = '/chat/{id}';

export const getProject = (configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<ProjectInvitationDto>> => {
  return Http.getRequest(getProject.key, undefined, undefined, undefined, overrideConfig(_CONSTANT0, configOverride));
};

/** Key is end point string without base url */
getProject.key = '/project';

export const getProjectId = (id: string, configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.getRequest(
    template(getProjectId.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectId.key = '/project/{id}';

export const getProjectIdAssets = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetsResponseDto>> => {
  return Http.getRequest(
    template(getProjectIdAssets.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdAssets.key = '/project/{id}/assets';

export const getProjectIdAssetsArchived = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectArchivedAssetsDto>> => {
  return Http.getRequest(
    template(getProjectIdAssetsArchived.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdAssetsArchived.key = '/project/{id}/assets/archived';

export const getProjectIdChats = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ChatDto[]>> => {
  return Http.getRequest(
    template(getProjectIdChats.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdChats.key = '/project/{id}/chats';

export const getProjectIdLogs = (
  id: string,
  queryParams?: GetProjectIdLogsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectLogsDto>> => {
  return Http.getRequest(
    template(getProjectIdLogs.key, { id }),
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdLogs.key = '/project/{id}/logs';

export const getProjectIdPaths = (
  id: string,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectPathDto[]>> => {
  return Http.getRequest(
    template(getProjectIdPaths.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdPaths.key = '/project/{id}/paths';

export const getProjects = (
  queryParams?: GetProjectsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectsResponseDto>> => {
  return Http.getRequest(
    getProjects.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjects.key = '/projects';

export const getUser = (configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<UserDto>> => {
  return Http.getRequest(getUser.key, undefined, undefined, undefined, overrideConfig(_CONSTANT0, configOverride));
};

/** Key is end point string without base url */
getUser.key = '/user';

export const getUserId = (id: string, configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<UserDto>> => {
  return Http.getRequest(
    template(getUserId.key, { id }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUserId.key = '/user/{id}';

export const patchAssetFileIdCommentCommentId = (
  id: string,
  commentId: string,
  requestBody: AssetCommentEditDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<AssetCommentDto>> => {
  return Http.patchRequest(
    template(patchAssetFileIdCommentCommentId.key, { id, commentId }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
patchAssetFileIdCommentCommentId.key = '/asset/file/{id}/comment/{commentId}';

export const postAssetFileIdComment = (
  id: string,
  requestBody: AssetCommentBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<AssetCommentDto>> => {
  return Http.postRequest(
    template(postAssetFileIdComment.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAssetFileIdComment.key = '/asset/file/{id}/comment';

export const postAuthSignIn = (
  requestBody: SignInBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<SignInResultDto>> => {
  return Http.postRequest(
    postAuthSignIn.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthSignIn.key = '/auth/sign-in';

export const postAuthSignUp = (
  requestBody: SignUpBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<SignUpResultDto>> => {
  return Http.postRequest(
    postAuthSignUp.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthSignUp.key = '/auth/sign-up';

export const postAuthSignUpInvitation = (
  requestBody: SignUpWithTokenBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<SignInResultDto>> => {
  return Http.postRequest(
    postAuthSignUpInvitation.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthSignUpInvitation.key = '/auth/sign-up-invitation';

export const postAuthSsoGoogle = (
  requestBody: TokenBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<SignInResultDto>> => {
  return Http.postRequest(
    postAuthSsoGoogle.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthSsoGoogle.key = '/auth/sso-google';

export const postAuthVerifyEmail = (
  requestBody: TokenBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<SignInResultDto>> => {
  return Http.postRequest(
    postAuthVerifyEmail.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postAuthVerifyEmail.key = '/auth/verify-email';

export const postProject = (
  requestBody: ProjectBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProject.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProject.key = '/project';

export const postProjectIdAssetsArchive = (
  id: string,
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetEditDto>> => {
  return Http.postRequest(
    template(postProjectIdAssetsArchive.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdAssetsArchive.key = '/project/{id}/assets/archive';

export const postProjectIdAssetsMove = (
  id: string,
  requestBody: AssetMoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    template(postProjectIdAssetsMove.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdAssetsMove.key = '/project/{id}/assets/move';

export const postProjectIdAssetsRestore = (
  id: string,
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    template(postProjectIdAssetsRestore.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdAssetsRestore.key = '/project/{id}/assets/restore';

export const postProjectIdChat = (
  id: string,
  requestBody: ChatBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    template(postProjectIdChat.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdChat.key = '/project/{id}/chat';

export const postProjectIdCover = (
  id: string,
  requestBody: ProjectCoverDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    template(postProjectIdCover.key, { id }),
    undefined,
    objToForm(requestBody),
    undefined,
    overrideConfig(_CONSTANT1, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdCover.key = '/project/{id}/cover';

export const postProjectIdFile = (
  id: string,
  requestBody: ProjectFileBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetEditDto>> => {
  return Http.postRequest(
    template(postProjectIdFile.key, { id }),
    undefined,
    objToForm(requestBody),
    undefined,
    overrideConfig(_CONSTANT1, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdFile.key = '/project/{id}/file';

export const postProjectIdFolder = (
  id: string,
  requestBody: FolderBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetEditDto>> => {
  return Http.postRequest(
    template(postProjectIdFolder.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdFolder.key = '/project/{id}/folder';

export const postProjectIdMember = (
  id: string,
  requestBody: ProjectMemberBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    template(postProjectIdMember.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdMember.key = '/project/{id}/member';

export const postUserAvatar = (configOverride?: AxiosRequestConfig): Promise<SwaggerResponse<UserDto>> => {
  return Http.postRequest(
    postUserAvatar.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUserAvatar.key = '/user/avatar';

export const putChatId = (
  id: string,
  requestBody: ChatEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ChatDto>> => {
  return Http.putRequest(
    template(putChatId.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putChatId.key = '/chat/{id}';

export const putProjectId = (
  id: string,
  requestBody: ProjectEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    template(putProjectId.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectId.key = '/project/{id}';

export const putProjectIdFileFileId = (
  id: string,
  fileId: string,
  requestBody: FileEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetEditDto>> => {
  return Http.putRequest(
    template(putProjectIdFileFileId.key, { id, fileId }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdFileFileId.key = '/project/{id}/file/{fileId}';

export const putProjectIdFolderFolderId = (
  id: string,
  folderId: string,
  requestBody: FolderEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectAssetEditDto>> => {
  return Http.putRequest(
    template(putProjectIdFolderFolderId.key, { id, folderId }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdFolderFolderId.key = '/project/{id}/folder/{folderId}';

export const putProjectIdMember = (
  id: string,
  requestBody: UpdateProjectMemberDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    template(putProjectIdMember.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdMember.key = '/project/{id}/member';

export const putProjectIdStatus = (
  id: string,
  requestBody: ProjectStatusBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    template(putProjectIdStatus.key, { id }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdStatus.key = '/project/{id}/status';
export const _CONSTANT0 = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
export const _CONSTANT1 = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};
