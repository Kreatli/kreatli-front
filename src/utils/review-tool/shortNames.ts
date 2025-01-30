import { ProjectFileDto, ProjectMemberDto } from '../../services/review-tool/types';

export const getProjectMemberLetter = (member: ProjectMemberDto) => {
  return member.user?.name.slice(0, 1).toUpperCase() ?? member.email.slice(0, 1).toUpperCase();
};

export const getFileAssigneeLetter = (assignee: ProjectFileDto['assignee']) => {
  return assignee?.name.slice(0, 1).toUpperCase() ?? '';
};
