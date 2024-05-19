type UserType = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  role?: "reader" | "writer" | "admin";
  publicMetadata: {
    frameAvatar?: string;
    premium: {
      state?: boolean;
      startDate?: Date;
      endDate?: Date;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

type NovelType = {
  _id: string;
  novelName: string;
  novelSlug: string;
  author: string;
  genres: string[];
  tags: string[];
  urlCover: string;
  uploader: string;
  description: string;
  reviews: {
    count: number;
    avgScore: number;
    avgScoreCharacter: number;
    avgScorePlot: number;
    avgScoreWorld: number;
    totalScoreCharacter: number;
    totalScorePlot: number;
    totalScoreWorld: number;
  };
  readCount: number;
  nominationCount: number;
  chapterCount: number;
  commentCount: number;
  state: string;
  isLock: boolean;
  isPublic: boolean;
  publishedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type ChapterType = {
  _id: string;
  novelSlug: string;
  chapterName: string;
  chapterIndex: number;
  content: string;
  state: string;
  isApprove: boolean;
  isLock: boolean;
  isPublic: boolean;
  publishedDate: Date | null;
};
