const colors = {
  primary: "#62BF53",
  lightGreen: "#1FD203",
  stateGreen: "#4AFF2C",
  stateBlue: "#0094FF",
  stateRed: "#FF4646",
  black: "#000000",
  white: "#FFFFFF",

  modalBg: "#4F4F4F",
};

const size = {
  desktop: "1141px",
  tabletL: "1140px",
  tabletS: "860px",
  mobile: "786px",
}

export const lightTheme = {
  // 변하는 부분
  bgColor: "#FFFFFF",
  textColor: "#000000",

  gray1: "#333333",
  gray6: "#F2F2F2",

  gray2: "#4F4F4F",
  gray5: "#E0E0E0",

  gray3: "#828282",
  gray4: "#BDBDBD",

  dropDown: "#FFFFFF",
  validation: "#FF0000",

  // 변하지 않는 부분
  ...colors,

  desktop: `(min-width: ${size.desktop})`,
  tabletL: `(max-width: ${size.tabletL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  mobile: `(max-width: ${size.mobile})`,
};

export const darkTheme = {
  bgColor: "#2F2F2F",
  textColor: "#ececec",

  gray1: "#F2F2F2",
  gray6: "#333333",

  gray2: "#E0E0E0",
  gray5: "#4F4F4F",

  gray3: "#BDBDBD",
  gray4: "#828282",

  dropDown: "#4F4F4F",
  validation: "#FF4F4F",

  ...colors,

  desktop: `(min-width: ${size.desktop})`,
  tabletL: `(max-width: ${size.tabletL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  mobile: `(max-width: ${size.mobile})`,
};

export const theme = {
  lightTheme,
  darkTheme,
};