export const fetchUser = () => {
  const userInfo = localStorage.getItem("uid")
    ? localStorage.getItem("uid")
    : localStorage.clear();
  return userInfo;
};
