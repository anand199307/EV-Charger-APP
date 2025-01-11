import { readUser } from "../../services/localStorage.service";


export const userAdmin = () => {
  const userlogin = readUser();
  if (userlogin.role === 0) {
    return "Organization Admin";
  } else if (userlogin.role === 2) {
    return "Account Admin";
  } else if (userlogin.role === 3) {
    return "Host Admin";
  }
};

