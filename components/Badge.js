import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {View, Button, Text} from '../components'
import { theme } from "../constants";

export default class Badge extends Component {
  render() {
    const {
      status,
      children,
      style,
      ...props
    } = this.props

    const colors = 
      status == 'Aktif' ? theme.colors.primary_light :
      status == 'NonAktif' ? theme.colors.black_t90 :
      status == 'Waiting' ? theme.colors.warning_light :
      status == 'Accepted' ? theme.colors.success_light : 
      status == 'Rejected' ? theme.colors.danger_light : theme.colors.primary_light

    return (
      <View padding={theme.sizes.base*.25} color={colors} radius={theme.sizes.base*.25}>
        <Text small bold white>
          {children}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
