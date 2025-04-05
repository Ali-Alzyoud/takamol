import { Poll } from "./polls";

export type TopicType = "discussion" | "poll";

export interface Topic {
  id: number;
  title: string;
  content?: string;
  topic_type: TopicType;
  poll?: number;
  poll_details: Poll;
  user: number;
  created_at: string;
  is_liked?: boolean;
  is_bookmarked?: boolean;
  likes_count?: number;
  comments_count?: number;
}

export interface Comment {
  id: number;
  topic: number;
  user: number;
  content: string;
  parent?: number;
  created_at: string;
  replies: Record<string, any>;
  is_liked?: boolean;
  likes_count?: number;
}

export interface Vote {
  id: number;
  topic: number;
  vote_type: number;
}
