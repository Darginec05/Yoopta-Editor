export type Contributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  contributions: number;
};

export type Repository = {
  stargazers_count: number;
};
