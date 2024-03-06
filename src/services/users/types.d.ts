interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  address?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export { User, LoginRequest };
