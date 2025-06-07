export const getUserFromCookie = async () => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error getting user from cookie:", error);
    return null;
  }
};
