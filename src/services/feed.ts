import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestPostCreation = (data: Api.PostPayload['/post']) => {
  return api.post('/post', data).then((res) => res.data);
};

export const requestPostEdit = ([id, data]: [Common.Id, Api.PutPayload['/post/:id']]) => {
  return api.put(`/post/${id}`, data).then((res) => res.data);
};

export const requestLikePost = (id: Common.Id) => {
  return api.post(`/post/${id}/like`, {}).then((res) => res.data);
};

export const requestPostCommentCreation = ([id, data]: [Common.Id, Api.PostPayload['/post/:id/comment']]) => {
  return api.post(`/post/${id}/comment`, data).then((res) => res.data);
};

export const requestLikePostComment = ([postId, commentId]: [Common.Id, Common.Id]) => {
  return api.post(`/post/${postId}/comment/${commentId}/like`, {}).then((res) => res.data);
};

export const requestPosts = (params?: Api.GetParams['/posts']) => {
  return api.get('/posts', params).then((res) => res.data);
};
