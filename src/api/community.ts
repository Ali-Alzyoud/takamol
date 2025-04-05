import { api } from ".";
import { Topic, Comment } from "../types/community";

export interface GetTopicsParams {
  page?: number;
  limit?: number;
}

/* 
  * Note: These endpoints are not complete in the Backend API yet.
*/

export const getTopics = async ({ page = 1, limit = 10 }: GetTopicsParams = {}) => {
  const response = await api.get<Topic[]>("/community/", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getTopic = async (id: string | number) => {
  const response = await api.get<Topic>(`/community/${id}/`);
  return response.data;
};

export const getTopicComments = async (topicId: string | number) => {
  const response = await api.get<Comment[]>(`/community/${topicId}/comments/`);
  return response.data;
};

export const createComment = async ({
  topicId,
  content,
  parent,
}: {
  topicId: string | number;
  content: string;
  parent?: number;
}) => {
  const response = await api.post<Comment>(`/community/comments/`, {
    content,
    topic: topicId,
    parent,
  });
  return response.data;
};

export const replyToComment = async ({
  topicId,
  commentId,
  content,
}: {
  topicId: string | number;
  commentId: number;
  content: string;
}) => {
  const response = await api.post<Comment>(`/community/${topicId}/comments/${commentId}/replies/`, {
    content,
  });
  return response.data;
};

export const likeTopic = async (topicId: string | number) => {
  const response = await api.post<void>(`/community/${topicId}/like/`);
  return response.data;
};

export const unlikeTopic = async (topicId: string | number) => {
  const response = await api.delete<void>(`/community/${topicId}/like/`);
  return response.data;
};

export const bookmarkTopic = async (topicId: string | number) => {
  const response = await api.post<void>(`/community/${topicId}/bookmark/`);
  return response.data;
};

export const unbookmarkTopic = async (topicId: string | number) => {
  const response = await api.delete<void>(`/community/${topicId}/bookmark/`);
  return response.data;
};

export const likeComment = async ({
  topicId,
  commentId,
}: {
  topicId: string | number;
  commentId: number;
}) => {
  const response = await api.post<void>(`/community/${topicId}/comments/${commentId}/like/`);
  return response.data;
};

export const unlikeComment = async ({
  topicId,
  commentId,
}: {
  topicId: string | number;
  commentId: number;
}) => {
  const response = await api.delete<void>(`/community/${topicId}/comments/${commentId}/like/`);
  return response.data;
}; 