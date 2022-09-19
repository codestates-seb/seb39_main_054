const colors = {
  primary: "#62BF53",
  lightGreen: "#1FD203",
  stateGreen: "#4AFF2C",
  stateBlue: "#0094FF",
  stateRed: "#FF4646",
  gray1: "#333333",
  gray2: "#4F4F4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#F2F2F2",
  black: "#000000",
  white: "#FFFFFF",
};

export const lightTheme = {
  colors: {
    // 변하는 부분
    bgColor: "#FFFFFF",
    textColor: "#000000",
    placholder: "#828282",

    // 변하지 않는 부분
    ...colors,
  },
};

export const darkTheme = {
  colors: {
    bgColor: "#2F2F2F",
    textColor: "#FFFFFF",
    placholder: "#ffffff",

    ...colors,
  },
};

export const theme = {
  lightTheme,
  darkTheme,
};