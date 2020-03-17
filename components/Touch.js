import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform, TouchableOpacity } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

export default class Touch extends Component {
  render() {
    const {
      style,
      opacity,
      ripple,
      children,
      borderless,
      ...props
    } = this.props
    return (
      (Platform.OS === 'ios' ? 
        <TouchableOpacity activeOpacity={opacity || 0.8} {...props} >
          {children}
        </TouchableOpacity>
      :
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(ripple || 'rgba(0,0,0,0.16)', borderless)} {...props}>
          {children}
        </TouchableNativeFeedback>
      )
    )
  }
}

const styles = StyleSheet.create({})
