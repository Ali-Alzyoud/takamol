export interface User {
  user_id: number;
  username: string;
  email: string;
  token: string;
  // has_completed_core_survey: boolean;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  invite_code: string;
  invite_password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    has_completed_core_survey: boolean;
  };
}

export interface Invitation {
  id: number;
  code: string;
  invite_password: string;
  invited_by: number | null;
  invited_by_username: string;
  invited_user: number | null;
  invited_user_username: string;
  created_at: string;
  expires_at: string;
}
