const fontFamily_src = {
  Regular: require('../assets/fonts/Roboto-Regular.ttf'),
  Medium: require('../assets/fonts/Roboto-Medium.ttf'),
  Bold: require('../assets/fonts/Roboto-Bold.ttf')
}
const colors = {
  primary: "#4285F4",
  primary_light: "#75A6F7",
  primary_dark: "#3161B2",
  secondary: "#BC298F",
  secondary_light: "#CE63AD",
  secondary_dark: "#891E69",
  // accent: "#F3534A",
  // tertiary: "#FFE358",
  white: "#FFFFFF",
  white_50p: "#FFFFFF80",
  black: "#140F2D",
  black_t30: "#545066",
  black_t60: "#94919F",
  black_t90: "#D4D3D8",
  backdrop: "#000000B3",
  danger: "#D72638",  
  danger_light: "#E1616E",
  danger_dark: "#9D1C29",
  warning: "#F49D37",
  warning_light: "#F7B76D",
  warning_dark: "#B27329",
  success: "#A2D729",
  success_light: "#BBE163",
  success_dark: "#769D1E",
  whatsapp: "#128C7E",
  // gray: "#9DA3B4",
  // gray2: "#C5CCD6"
};

const sizes = {
  // global sizes
  base: 16,
  font: 16,
  padding: 16,
  radius: 4,

  // font sizes
  h1: 28,
  h2: 24,
  h3: 20,
  title: 20,
  body: 16,
  lilbit: 14,
  caption: 12,
  small: 10,
};

const fonts = {
  h1: {
    // fontFamily: 'Bold',
    fontSize: sizes.h1,
    fontWeight: 'bold'
  },
  h2: {
    // fontFamily: 'Bold',
    fontSize: sizes.h2,
    fontWeight: 'bold'
  },
  h3: {
    // fontFamily: 'Bold',
    fontSize: sizes.h3,
    fontWeight: 'bold'
  },
  title: {
    // fontFamily: 'Medium',
    fontSize: sizes.title,
    fontWeight: 'bold'
  },
  body: {
    // fontFamily: 'Regular',
    fontSize: sizes.body
  },
  caption: {
    // fontFamily: 'Regular',
    fontSize: sizes.caption
  },
  lilbit: {
    // fontFamily: 'Regular',
    fontSize: sizes.lilbit
  },
  small: {
    // fontFamily: 'Regular',
    fontSize: sizes.small
  }
};

export { colors, sizes, fonts };