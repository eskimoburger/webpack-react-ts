import axios from "./index";

export interface AuthRequest {
  username: string;
  password: string | number;
}

async function Auth(authRequest: AuthRequest) {
  return await axios.post("/auth/signin", authRequest);
}

async function Profile(token: string) {
  return await axios.get("/auth/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
async function ProfileWithRefreshToken(token: string) {
  return await axios.get("/auth/refresh", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export { Auth, Profile,ProfileWithRefreshToken };
