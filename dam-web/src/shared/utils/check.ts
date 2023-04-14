export const checkJwtIsValid = (value: string): boolean => {
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  if (!value) return false;

  const decodedJwt = parseJwt(value);
  return decodedJwt.exp * 1000 > Date.now();
};
