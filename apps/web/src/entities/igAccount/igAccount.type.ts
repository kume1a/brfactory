export type IGAccount = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  password: string;
  user: string;
};

export type CreateIGAccountInput = Pick<IGAccount, 'username' | 'email' | 'password' | 'user'>;

export type UpdateIGAccountInput = Partial<Omit<CreateIGAccountInput, 'user'>>;
