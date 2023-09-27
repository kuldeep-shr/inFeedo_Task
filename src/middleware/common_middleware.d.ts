interface UserDetails {
  name: string;
  email: string;
}

interface TokenAssignedTypes {
  id: number;
  secretKey: string;
  user: UserDetails;
}

type VerifyPasswordTypes = {
  id: number;
  email: string;
  inputPassword: string;
};

export { UserDetails, TokenAssignedTypes, VerifyPasswordTypes };
