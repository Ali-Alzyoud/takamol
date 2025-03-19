import getAvatar from "../utils/getAvatar";

// *NOTE: This mock doesn't follow the actual API response as it seems the API is not handling the user data correctly
const mockUsers = [
  {
    id: 1,
    username: "Takamol Team",
    avatar: getAvatar("team"),
    location: "Palestine",
  },
  {
    id: 2,
    username: "Fadi Q",
    avatar: getAvatar("fadi"),
    location: "Palestine",
  },
  {
    id: 3,
    username: "Steve D",
    avatar: getAvatar("steve"),
    location: "Chicago - USA",
  },
];

const mockDiscussions = [
  {
    id: "1",
    title: "Building Freedom: The Evolution and Power of Freedom Charters",
    content:
      'In a world marked by division and dissent, the idea of a "freedom charter" resonates as both a beacon of hope and a blueprint for collective action. From the dusty townships of apartheid-era South Africa to the global reform movements today, freedom charters have emerged as powerful tools for articulating shared visions of justice, equality, and self-determination.',
    image: "/images/freedom-charter.jpg",
    author: mockUsers[0],
    createdAt: "2 hours ago",
    commentsCount: 56,
    likes: 82,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: "1",
        content:
          "At its core, a freedom charter is more than a list of demands. It is a unifying manifesto, often born out of participatory processes where diverse voices converge to articulate shared goals. The collaborative nature of these documents ensures they are not just statements of intent but living reflections of the communities they represent.",
        author: mockUsers[1],
        createdAt: "2 hours ago",
        likes: 32,
        isLiked: false,
        replies: [],
      },
      {
        id: "2",
        content: "I completely Agree with this",
        author: mockUsers[2],
        createdAt: "2 hours ago",
        likes: 12,
        isLiked: false,
        replies: [],
      },
    ],
  },
];

export const getDiscussions = async (): Promise<any[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockDiscussions;
};

export const getDiscussion = async (id: string): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockDiscussions.find((d) => d.id === id);
};

export const addComment = async (
  discussionId: string,
  content: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const addReply = async (
  discussionId: string,
  commentId: string,
  content: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const toggleLike = async (discussionId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

export const toggleSave = async (discussionId: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};
