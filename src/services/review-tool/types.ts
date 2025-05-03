//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface AssetAfterDetails {
  assignee?: UserDetails;
  description?: string;
  name?: string;
  parent?: FolderDetails;
  status?: null | 'review-needed' | 'in-progress' | 'changes-required' | 'approved';
}

export interface AssetBeforeDetails {
  id: string;
  name: string;
  type: 'file' | 'folder';
  assignee?: UserDetails;
  parent?: FolderDetails;
  status?: null | 'review-needed' | 'in-progress' | 'changes-required' | 'approved';
}

export interface AssetCommentAddedLogDto {
  createdAt: string;
  details: FileCommentAddedDetails;
  id: string;
  type: 'ASSET_COMMENT_ADDED';
  user: UserDto;
}

export interface AssetCommentBodyDto {
  /**
   *
   * - maxLength: 1000
   */
  message: string;
  canvas?: AssetCommentCanvas;
  parent?: string;
  timestamp?: number[];
}

export interface AssetCommentCanvas {
  shapes: AssetCommentCanvasShape[];
}

export interface AssetCommentCanvasShape {
  color: 'white' | 'black' | 'red' | 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'cyan' | 'zinc';
  points: number[];
  type: 'line' | 'arrow';
}

export interface AssetCommentDownloadedLogDto {
  createdAt: string;
  details: AssetDownloadedDetails;
  id: string;
  type: 'ASSET_DOWNLOADED';
  user: UserDto;
}

export interface AssetCommentDto {
  /**
   *
   * - Format: date-time
   */
  createdAt: string;
  createdBy: UserDto;
  id: string;
  isResolved: boolean;
  message: string;
  replies: AssetCommentDto[];
  canvas?: AssetCommentCanvas;
  parent?: string;
  timestamp?: number[];
}

export interface AssetCommentEditDto {
  isResolved: boolean;
}

export interface AssetCommentResolvedLogDto {
  createdAt: string;
  details: FileCommentResolvedDetails;
  id: string;
  type: 'ASSET_COMMENT_RESOLVED';
  user: UserDto;
}

export interface AssetCommentsResponse {
  comments: AssetCommentDto[];
}

export interface AssetDetails {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

export interface AssetDownloadedDetails {
  asset: AssetDetails;
}

export interface AssetMoveBodyDto {
  assetIds: string[];
  fromId?: string;
  toId?: string;
}

export interface AssetNewVersionUploadedLogDto {
  createdAt: string;
  details: FileNewVersionUploadedDetails;
  id: string;
  type: 'ASSET_NEW_VERSION_UPLOADED';
  user: UserDto;
}

export interface AssetRemoveBodyDto {
  assetIds: string[];
}

export interface AssetUpdatedDetails {
  asset: AssetBeforeDetails;
  updatedFields: AssetAfterDetails;
}

export interface AssetUpdatedLogDto {
  createdAt: string;
  details: AssetUpdatedDetails;
  id: string;
  type: 'ASSET_UPDATED';
  user: UserDto;
}

export interface AssetUploadedLogDto {
  createdAt: string;
  details: FileUploadedDetails;
  id: string;
  type: 'ASSET_UPLOADED';
  user: UserDto;
}

export interface AssetsArchivedDetails {
  assets: AssetDetails[];
}

export interface AssetsArchivedLogDto {
  createdAt: string;
  details: AssetsArchivedDetails;
  id: string;
  type: 'ASSETS_ARCHIVED';
  user: UserDto;
}

export interface AssetsDownloadedDetails {
  assets: AssetDetails[];
}

export interface AssetsDownloadedLogDto {
  createdAt: string;
  details: AssetsDownloadedDetails;
  id: string;
  type: 'ASSETS_DOWNLOADED';
  user: UserDto;
}

export interface AssetsMovedDetails {
  assets: AssetDetails[];
  from?: FolderDetails;
  to?: FolderDetails;
}

export interface AssetsMovedLogDto {
  createdAt: string;
  details: AssetsMovedDetails;
  id: string;
  type: 'ASSETS_MOVED';
  user: UserDto;
}

export interface AssetsRemovedDetails {
  assets: AssetDetails[];
}

export interface AssetsRemovedLogDto {
  createdAt: string;
  details: AssetsRemovedDetails;
  id: string;
  type: 'ASSETS_REMOVED';
  user: UserDto;
}

export interface AssetsRestoredDetails {
  assets: AssetDetails[];
}

export interface AssetsRestoredLogDto {
  createdAt: string;
  details: AssetsRestoredDetails;
  id: string;
  type: 'ASSETS_RESTORED';
  user: UserDto;
}

export interface AssetsUploadedLogDto {
  createdAt: string;
  details: FilesUploadedDetails;
  id: string;
  type: 'ASSETS_UPLOADED';
  user: UserDto;
}

export interface Blob {
  [(x in string) | number]: any;
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

export interface CommentDetails {
  id: string;
}

export interface FileCommentAddedDetails {
  asset: FileDetails;
  comment: CommentDetails;
}

export interface FileCommentResolvedDetails {
  asset: FileDetails;
  comment: CommentDetails;
}

export interface FileDetails {
  id: string;
  name: string;
}

export interface FileDto {
  commentsCount: number;
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  path: FolderDto[];
  type: 'file';
  url: string;
  assignee?: UserDto;
  createdBy?: UserDto;
  parent?: FolderDto;
  status?: 'review-needed' | 'in-progress' | 'changes-required' | 'approved';
}

export interface FileEditBodyDto {
  assigneeId?: string;
  description?: string;
  name?: string;
  parentId?: string;
  status?: 'review-needed' | 'in-progress' | 'changes-required' | 'approved';
}

export interface FileNewVersionUploadedDetails {
  asset: FileDetails;
}

export interface FileUploadedDetails {
  asset: FileDetails;
}

export interface FilesUploadedDetails {
  assets: FileDetails[];
}

export interface FolderBodyDto {
  name: string;
  parentId?: string;
}

export interface FolderCreatedDetails {
  folder: FolderDetails;
}

export interface FolderCreatedLogDto {
  createdAt: string;
  details: FolderCreatedDetails;
  id: string;
  type: 'FOLDER_CREATED';
  user: UserDto;
}

export interface FolderDetails {
  id: string;
  name: string;
}

export interface FolderDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  children: (ProjectFolderDto | ProjectFileDto)[];
  createdAt: string;
  description: string;
  fileCount: number;
  id: string;
  name: string;
  path: FolderDto[];
  totalFileSize: number;
  createdBy?: UserDto;
  parent?: FolderDto;
}

export interface FolderEditBodyDto {
  children?: string[];
  description?: string;
  name?: string;
  parentId?: string;
}

export interface GetChatIdQueryParams {
  limit: number;
  offset: number;
}

export interface GetProjectIdLogsQueryParams {
  createAtFrom?: string;
  createAtTo?: string;
  limit?: number;
  offset?: number;
  userIds?: string;
}

export interface GetProjectsQueryParams {
  search?: string;
  status?: 'all' | 'active' | 'completed' | 'archived';
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

export interface MemberDetails {
  email: string;
}

export interface ProjectArchivedAssetsDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
}

export interface ProjectAssetDto {
  [(x in string) | number]: any;
}

export interface ProjectAssetEditDto {
  project: ProjectDto;
  file?: ProjectFileDto;
  folder?: FolderDto;
  parent?: FolderDto;
}

export interface ProjectAssetsResponseDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  assets: (ProjectFolderDto | ProjectFileDto)[];
}

export interface ProjectBodyDto {
  description: string;
  name: string;
  members?: string[];
}

export interface ProjectCoverDto {
  /**
   *
   * - Format: binary
   */
  cover?: Blob;
}

export interface ProjectCreatedLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_CREATED';
  user: UserDto;
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
  status: 'active' | 'completed' | 'archived';
  totalFileSize: number;
  cover?: InterfaceImageDto;
  createdBy?: UserDto;
  updatedAt?: string;
  updatedBy?: UserDto;
}

export interface ProjectEditBodyDto {
  assets?: string[];
  description?: string;
  name?: string;
}

export interface ProjectFileBodyDto {
  /**
   *
   * - Format: binary
   */
  file: Blob;
  parentId?: string;
}

export interface ProjectFileDto {
  commentsCount: number;
  createdAt: string;
  description: string;
  fileSize: number;
  fileType: string;
  format: string;
  id: string;
  metadata: { [x in string | number]: any };
  name: string;
  type: 'file';
  url: string;
  assignee?: UserDto;
  createdBy?: UserDto;
  parentId?: string;
  status?: 'review-needed' | 'in-progress' | 'changes-required' | 'approved';
}

export interface ProjectFolderChild {
  description: string;
  id: string;
  name: string;
  type: 'folder' | 'file';
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
  type: 'folder';
  createdBy?: UserDto;
  parentId?: string;
}

export interface ProjectInvitationDto {
  email: string;
  projectId: string;
  projectName: string;
  projectCover?: InterfaceImageDto;
}

export interface ProjectLogsDto {
  /**
   *
   * An array of assets which can be folders or files.
   */
  logs: (
    | AssetCommentAddedLogDto
    | AssetCommentResolvedLogDto
    | AssetCommentDownloadedLogDto
    | AssetNewVersionUploadedLogDto
    | AssetsArchivedLogDto
    | AssetsDownloadedLogDto
    | AssetsMovedLogDto
    | AssetsRemovedLogDto
    | AssetsRestoredLogDto
    | AssetsUploadedLogDto
    | AssetUpdatedLogDto
    | AssetUploadedLogDto
    | FolderCreatedLogDto
    | ProjectCreatedLogDto
    | ProjectMemberInvitedLogDto
    | ProjectMemberJoinedLogDto
    | ProjectMemberLeftLogDto
    | ProjectMemberRemovedLogDto
    | ProjectRemovedLogDto
    | ProjectUpdatedLogDto
  )[];
  logsCount: number;
}

export interface ProjectMemberBodyDto {
  email: string;
  role: 'owner' | 'contributor';
}

export interface ProjectMemberDto {
  email: string;
  id: string;
  invitedAt: string;
  role: 'owner' | 'contributor';
  status: 'invited' | 'joined' | 'removed' | 'left';
  user?: UserDto;
}

export interface ProjectMemberInvitedDetails {
  user: MemberDetails;
}

export interface ProjectMemberInvitedLogDto {
  createdAt: string;
  details: ProjectMemberInvitedDetails;
  id: string;
  type: 'PROJECT_MEMBER_INVITED';
  user: UserDto;
}

export interface ProjectMemberJoinedDetails {
  user: UserDetails;
}

export interface ProjectMemberJoinedLogDto {
  createdAt: string;
  details: ProjectMemberJoinedDetails;
  id: string;
  type: 'PROJECT_MEMBER_JOINED';
  user: UserDto;
}

export interface ProjectMemberLeftLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_MEMBER_LEFT';
  user: UserDto;
}

export interface ProjectMemberRemovedDetails {
  user: UserDetails;
}

export interface ProjectMemberRemovedLogDto {
  createdAt: string;
  details: ProjectMemberRemovedDetails;
  id: string;
  type: 'PROJECT_MEMBER_REMOVED';
  user: UserDto;
}

export interface ProjectPathDto {
  id: string;
  name: string;
  path: ProjectPathFolderDto[];
}

export interface ProjectPathFolderDto {
  id: string;
  name: string;
}

export interface ProjectRemovedLogDto {
  createdAt: string;
  details: { [x in string | number]: any };
  id: string;
  type: 'PROJECT_REMOVED';
  user: UserDto;
}

export interface ProjectStatusBodyDto {
  status: 'active' | 'completed' | 'archived';
}

export interface ProjectTotals {
  active: number;
  all: number;
  archived: number;
  completed: number;
}

export interface ProjectUpdatedDetails {
  description?: string;
  isAssetsOrderChanged?: boolean;
  isCoverChanged?: boolean;
  name?: string;
  status?: 'active' | 'completed' | 'archived';
}

export interface ProjectUpdatedLogDto {
  createdAt: string;
  details: ProjectUpdatedDetails;
  id: string;
  type: 'PROJECT_UPDATED';
  user: UserDto;
}

export interface ProjectsResponseDto {
  projects: ProjectDto[];
  totals: ProjectTotals;
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
}

export interface SignUpResultDto {
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

export interface UpdateProjectMemberDto {
  token: string;
}

export interface UserDetails {
  id: string;
  name: string;
}

export interface UserDto {
  email: string;
  id: string;
  name: string;
  avatar?: InterfaceImageDto;
}
