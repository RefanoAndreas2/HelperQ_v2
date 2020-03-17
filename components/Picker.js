import React, {Component} from 'react'
import {StyleSheet, Picker} from 'react-native'

import Text from './Text'
import View from './View'
import Button from './Button'
import {theme} from '../constants'

export default class Select extends Component{
  state={
    borderBottomColor: theme.colors.black_t60
  }

  renderLabel() {
    const { label} = this.props;

    return (
      <View flex={false} padding={[0, theme.sizes.base*.75]}>
        {label ? (
          <Text caption style={{color: this.state.borderBottomColor}}>
            {label}
          </Text>
        ) : null}
      </View>
    );
  }

  render(){
    const { children, containerStyle, pickerStyle, ...props } = this.props
    const inputStyles = [styles.container, containerStyle, {borderBottomColor: this.state.borderBottomColor}]
    const selectStyles = [styles.picker, pickerStyle]
    return(
      <View margin={[theme.sizes.base*.5, 0]} style={inputStyles}>
        {this.renderLabel()}
        <Picker {...props} style={[selectStyles]}>
          {children}
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1
  },
  picker: {
    marginLeft: theme.sizes.base*.25
  }
})