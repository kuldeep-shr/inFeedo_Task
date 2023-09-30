interface CreateUser {
  name: string;
  email: string;
  password: string;
}

type SingleUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export { CreateUser, SingleUser };
