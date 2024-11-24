//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface AssetRemoveBodyDto {
  assetIds: string[];
}

export interface ChatBodyDto {
  members: string;
  name?: string;
}

export interface ChatDto {
  createdAt: string;
  id: string;
  members: UserDto[];
  name: string;
  pinnedMessages: ChatMessageDto[];
  cover?: InterfaceImageDto;
  createdBy?: UserDto;
  lastMessage?: ChatMessageDto;
  updatedAt?: string;
  updatedBy?: UserDto;
}

export interface ChatEditBodyDto {
  name: string;
}

export interface ChatMessageDto {
  assets: ProjectAssetDto[];
  content: string;
  createdAt: string;
  id: string;
  isPinned: boolean;
  readBy: string[];
  sender: UserDto;
}

export interface ChatResponseDto {
  chat: ChatDto;
  messages: ChatMessageDto[];
  messagesCount: number;
}

export interface FileEditBodyDto {
  assigneeId?: string;
  description?: string;
  name?: string;
  parentId?: string;
  status?: "review-needed" | "in-progress" | "changes-required" | "approved";
}

export interface FolderBodyDto {
  name: string;
  parentId?: string;
}

export interface FolderEditBodyDto {
  description?: string;
  name?: string;
  parentId?: string;
}

export interface GetChatIdQueryParams {
  limit: number;
  offset: number;
}

export interface GetProjectIdLogsQueryParams {
  createAtFrom: string;
  createAtTo: string;
  limit: number;
  offset: number;
  userIds: string;
}

export interface GetProjectsQueryParams {
  search?: string;
  status?: "all" | "active" | "completed" | "archived";
}

export interface InterfaceImageDto {
  createdAt: string;
  description: string;
  fileSize: number;
  height: number;
  originalFileName: string;
  url: string;
  width: number;
}

export interface ProjectAssetDto {
  [(x in string) | number]: any;
}

export interface ProjectBodyDto {
  description: string;
  members: string[];
  name: string;
}

export interface ProjectDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  members: ProjectMemberDto[];
  name: string;
  status: "active" | "completed" | "archived";
  totalFileSize: number;
  cover?: InterfaceImageDto;
  createdBy?: UserDto;
  updatedAt?: string;
  updatedBy?: UserDto;
}

export interface ProjectEditBodyDto {
  assets: string[];
  description: string;
  name: string;
}

export interface ProjectFileDto {
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  type: "file";
  url: string;
  assignee?: UserDto;
  createdBy?: UserDto;
  status?: "review-needed" | "in-progress" | "changes-required" | "approved";
}

export interface ProjectFolderChild {
  description: string;
  id: string;
  name: string;
  type: "folder" | "file";
  url?: string;
}

export interface ProjectFolderDto {
  children: ProjectFolderChild[];
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  name: string;
  totalFileSize: number;
  type: "folder";
  createdBy?: UserDto;
}

export interface ProjectLogsDto {
  logs: string;
  logsCount: number;
}

export interface ProjectMemberBodyDto {
  email: string;
  role: "owner" | "contributor";
}

export interface ProjectMemberDto {
  email: string;
  id: string;
  invitedAt: string;
  role: "owner" | "contributor";
  status: "invited" | "joined" | "removed" | "left";
  user: UserDto;
}

export interface ProjectStatusBodyDto {
  status: string;
}

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface SignInResultDto {
  token: string;
  user: UserDto;
}

export interface SignUpBodyDto {
  email: string;
  name: string;
  password: string;
  isEmailVerified?: boolean;
}

export interface SignUpResultDto {
  link: string;
  user: UserDto;
}

export interface SignUpWithTokenBodyDto {
  name: string;
  password: string;
  token: string;
}

export interface TokenBodyDto {
  token: string;
}

export interface UserDto {
  email: string;
  id: string;
  name: string;
  avatar?: InterfaceImageDto;
}
