export interface UserInfo {
  _id: string;
  username: string;
  password?: string; // Có thể để optional vì API profile thường ẩn pass
  ssoId: string;
  ssoProvider: string;
  ssoUsername: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  gender: 'Male' | 'Female';
  dob: string;
  systemRole: 'Admin' | 'User';
  authList: string[];
  studentPtitCode: string;
  avatarUrl: string;
  schoolName: string;
  dataPartitionCode: string;
  lastLoginAt: string;
}

export interface User extends UserInfo {
  createdAt: string;
  updatedAt: string;
}
