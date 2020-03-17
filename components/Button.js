import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../constants";

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      // gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ripple,
      border,
      radius,
      smallHeight,
      borderless,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      smallHeight && {height: theme.sizes.base*2},
      border && styles[border],
      border && !styles[border] && { borderWidth: 2, borderColor: border },
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style
    ];
    
    return (
      (Platform.OS === 'ios' ? 
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity || 0.8}
          {...props}
        >
          {children}
        </TouchableOpacity>
      :
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(ripple, borderless)} {...props}>
          <View style={[buttonStyles]}>
            {children}
          </View>
        </TouchableNativeFeedback>
      )
    );
  }
}

Button.defaultProps = {
  startColor: theme.colors.primary,
  endColor: theme.colors.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: theme.colors.white
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 }
});