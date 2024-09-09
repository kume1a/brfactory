export type IGAccount = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  password: string;
};

export type CreateIGAccountInput = {
  username: string;
  email: string;
  password: string;
  user: string;
};

export type UpdateIGAccountInput = Partial<Omit<CreateIGAccountInput, 'user'>>;
