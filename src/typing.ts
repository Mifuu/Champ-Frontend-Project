type LoginUser = {
  email: string;
  password: string;
};

type LoginUserRequest = {
  user: LoginUser;
};

type NewUser = {
  username: string;
  email: string;
  password: string;
};

type NewUserRequest = {
  user: NewUser;
};

type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

type UserResponse = {
  user: User;
};

type UpdateUser = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

type UpdateUserRequest = {
  user: UpdateUser;
};

type ProfileResponse = {
  profile: Profile;
};

type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

type SingleArticleResponse = {
  article: Article;
};

type MultipleArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

type NewArticle = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type NewArticleRequest = {
  article: NewArticle;
};

type UpdateArticle = {
  title: string;
  description: string;
  body: string;
};

type UpdateArticleRequest = {
  article: UpdateArticle;
};

type Comment1 = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
};

type SingleCommentResponse = {
  comment: Comment;
};

type MultipleCommentsResponse = {
  comments: Comment[];
};

type NewComment = {
  body: string;
};

type NewCommentRequest = {
  comment: NewComment;
};

type TagsResponse = {
  tags: string[];
};

type GenericErrorModel = {
  errors: {
    body: string[];
  };
};

export type { 
    LoginUser,
    LoginUserRequest,
    NewUser,
    NewUserRequest,
    User,
    UserResponse,
    UpdateUser,
    UpdateUserRequest,
    ProfileResponse,
    Profile,
    Article,
    SingleArticleResponse,
    MultipleArticlesResponse,
    NewArticle,
    NewArticleRequest,
    UpdateArticle,
    UpdateArticleRequest,
    Comment1,
    SingleCommentResponse,
    MultipleCommentsResponse,
    NewComment,
    NewCommentRequest,
    TagsResponse,
    GenericErrorModel,
  };