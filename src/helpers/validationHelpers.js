export const  isValidEmail = (email = '') => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailReg.test(email);
};

export const isValidLength = (str = '', length = 6) => {
  return str.length >= length;
};
