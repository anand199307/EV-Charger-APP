const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + "/avatars/avatar5.webp";

// const testUser = {
//   id: 1,
//   firstName: "Chris",
//   lastName: "Johnson",
//   imgUrl: avatarImg,
//   userName: "@john1989",
//   email: {
//     name: "chris.johnson@altence.com",
//     verified: true,
//   },
//   phone: {
//     number: "+18143519459",
//     verified: true,
//   },
//   sex: "male",
//   birthday: "01/26/2022",
//   lang: "en",
//   country: "GB",
//   city: "London",
//   address1: "14 London Road",
//   zipcode: 5211,
//   website: "altence.com",
//   socials: {
//     twitter: "@altence_team",
//     facebook: "https://facebook.com/groups/1076577369582221",
//     linkedin: "https://linkedin.com/company/altence",
//   },
// };

export const persistToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const readToken = () => {
  return localStorage.getItem("accessToken") || "bearerToken";
};

export const persistUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const readUser = () => {
  const userStr = localStorage.getItem("user");
  try {
    return userStr !== null ? JSON.parse(userStr) : "";
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
};

export const deleteToken = () => localStorage.removeItem("auth_token");
export const deleteUser = () => localStorage.removeItem("user");
