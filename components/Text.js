// just copy this code from the driving repo :)
import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../constants";

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      lilbit,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      underline,
      spacing, // letter-spacing
      height, // line-height
      italic,
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      black_t30,
      black_t60,
      black_t90,
      white,
      gray,
      gray2,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      lilbit && styles.lilbit,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      underline && { textDecorationLine: 'underline' },
      italic && { fontStyle: 'italic' },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      black && styles.black,
      black_t30 && styles.black_t30,
      black_t60 && styles.black_t60,
      black_t90 && styles.black_t90,
      white && styles.white,
      style // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },

  // variations
  regular: {
    fontWeight: "normal"
  },
  bold: {
    fontWeight: "bold"
  },
  semibold: {
    fontWeight: "500"
  },
  medium: {
    fontWeight: "500"
  },
  light: {
    fontWeight: "200"
  },

  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },

  // colors
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  black: { color: theme.colors.black },
  black_t30: { color: theme.colors.black_t30 },
  black_t60: { color: theme.colors.black_t60 },
  black_t90: { color: theme.colors.black_t90 },
  white: { color: theme.colors.white },

  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  lilbit: theme.fonts.lilbit,
  caption: theme.fonts.caption,
  small: theme.fonts.small
});