//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import type { AxiosRequestConfig } from "axios";
import type { SwaggerResponse } from "./config";
import { Http } from "./httpRequest";
//@ts-ignore
import qs from "qs";
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
  ProjectStatusBodyDto,
  ProjectMemberBodyDto,
  FileEditBodyDto,
  FolderBodyDto,
  FolderEditBodyDto,
  AssetRemoveBodyDto,
  ChatBodyDto,
  ChatDto,
  ProjectLogsDto,
  ChatResponseDto,
  ChatEditBodyDto,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig,
): AxiosRequestConfig {
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
    const re = new RegExp(`{${key}}`, "i");
    path = path.replace(re, obj[key]);
  });

  return path;
}

function isFormData(obj: any) {
  // This checks for the append method which should exist on FormData instances
  return (
    (typeof obj === "object" &&
      typeof obj.append === "function" &&
      obj[Symbol.toStringTag] === undefined) ||
    obj[Symbol.toStringTag] === "FormData"
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

export const deleteProjectId = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    deleteProjectId.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectId.key = "/project/{id}";

export const deleteProjectIdAssets = (
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    deleteProjectIdAssets.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdAssets.key = "/project/{id}/assets";

export const deleteProjectIdMember = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    deleteProjectIdMember.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdMember.key = "/project/{id}/member";

export const deleteProjectIdMemberMemberId = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.deleteRequest(
    deleteProjectIdMemberMemberId.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteProjectIdMemberMemberId.key = "/project/{id}/member/{memberId}";

export const get = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    get.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
get.key = "/";

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
getChatId.key = "/chat/{id}";

export const getProjectId = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.getRequest(
    getProjectId.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectId.key = "/project/{id}";

export const getProjectIdChats = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ChatDto[]>> => {
  return Http.getRequest(
    getProjectIdChats.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdChats.key = "/project/{id}/chats";

export const getProjectIdLogs = (
  queryParams: GetProjectIdLogsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectLogsDto>> => {
  return Http.getRequest(
    getProjectIdLogs.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjectIdLogs.key = "/project/{id}/logs";

export const getProjects = (
  queryParams?: GetProjectsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.getRequest(
    getProjects.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getProjects.key = "/projects";

export const getUserId = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<UserDto>> => {
  return Http.getRequest(
    getUserId.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUserId.key = "/user/{id}";

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
postAuthSignIn.key = "/auth/sign-in";

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
postAuthSignUp.key = "/auth/sign-up";

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
postAuthSignUpInvitation.key = "/auth/sign-up-invitation";

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
postAuthSsoGoogle.key = "/auth/sso-google";

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
postAuthVerifyEmail.key = "/auth/verify-email";

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
postProject.key = "/project";

export const postProjectIdAssetsArchive = (
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdAssetsArchive.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdAssetsArchive.key = "/project/{id}/assets/archive";

export const postProjectIdAssetsRestore = (
  requestBody: AssetRemoveBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdAssetsRestore.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdAssetsRestore.key = "/project/{id}/assets/restore";

export const postProjectIdChat = (
  requestBody: ChatBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postProjectIdChat.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdChat.key = "/project/{id}/chat";

export const postProjectIdCover = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdCover.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdCover.key = "/project/{id}/cover";

export const postProjectIdFile = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdFile.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdFile.key = "/project/{id}/file";

export const postProjectIdFolder = (
  requestBody: FolderBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdFolder.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdFolder.key = "/project/{id}/folder";

export const postProjectIdMember = (
  requestBody: ProjectMemberBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.postRequest(
    postProjectIdMember.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postProjectIdMember.key = "/project/{id}/member";

export const postUserAvatar = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<UserDto>> => {
  return Http.postRequest(
    postUserAvatar.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUserAvatar.key = "/user/avatar";

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
putChatId.key = "/chat/{id}";

export const putProjectId = (
  requestBody: ProjectEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    putProjectId.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectId.key = "/project/{id}";

export const putProjectIdFileFileId = (
  requestBody: FileEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    putProjectIdFileFileId.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdFileFileId.key = "/project/{id}/file/{fileId}";

export const putProjectIdFolderFolderId = (
  requestBody: FolderEditBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    putProjectIdFolderFolderId.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdFolderFolderId.key = "/project/{id}/folder/{folderId}";

export const putProjectIdStatus = (
  requestBody: ProjectStatusBodyDto,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<ProjectDto>> => {
  return Http.putRequest(
    putProjectIdStatus.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putProjectIdStatus.key = "/project/{id}/status";
export const _CONSTANT0 = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
