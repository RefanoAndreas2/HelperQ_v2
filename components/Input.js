import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Text from "./Text";
import View from "./View";
import Button from "./Button";
import { theme } from "../constants";

export default class Input extends Component {
  state = {
    toggleSecure: false,
    borderBottomColor: theme.colors.black_t60
  };

  componentDidMount() {
    if (this.props.onRef != null) {
        this.props.onRef(this)
    }
  }

  renderLabel() {
    const { label, error } = this.props;

    return (
      <View flex={false} padding={[0, theme.sizes.base*.75]}>
        {label ? (
          <Text gray2={!error} accent={error} caption style={{color: this.state.borderBottomColor}}>
            {label}
          </Text>
        ) : null}
      </View>
    );
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;
    const icon = <Icon color={theme.colors.primary} size={theme.sizes.font * 1.35} name={!toggleSecure ? "md-eye" : "md-eye-off"}/>

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {rightLabel ? (
          rightLabel
        ) : (
          icon
        )}
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Text color='gray' style={{position: 'absolute', right: theme.sizes.base, bottom: theme.sizes.base*.5}}>{rightLabel}</Text>
    );
  }

  isError(){
    this.setState({borderBottomColor: theme.colors.danger})
  }

  onFocus(){
    const {error} = this.props;

    if (error) {
      this.setState({borderBottomColor: theme.colors.danger})
    }else{
      this.setState({borderBottomColor: theme.colors.primary})
    }
  }
  onBlur() {
    this.setState({borderBottomColor: theme.colors.black_t60})
  }

  onSubmitEditing(){
    this.props.onSubmitEditing();
  }

  focus(){
    this.textInput.focus()
    // this.setState({borderBottomColor: theme.colors.primary})
  }
  // blur(){
  //   // this.setState({borderBottomColor: theme.colors.black_t60})
  // }

  render() {
    const { email, phone, number, secure, error, style, multiline, ...props } = this.props;

    const { toggleSecure,} = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      // error && { color: theme.colors.danger},
      style,
      multiline && {height: 'auto', minHeight: theme.sizes.base*2.5}, 
      {borderBottomColor: this.state.borderBottomColor}
    ];
 
    const inputType = email
      ? "email-address"
      : number
      ? "numeric"
      : phone
      ? "phone-pad"
      : "default";
    
    return (
      <View flex={false} margin={[theme.sizes.base / 2, 0]}>
        {this.renderLabel()}
        {/* {this.isError()} */}
        <TextInput
          multiline={multiline}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          ref={input => this.textInput = input}
          onSubmitEditing={this.onSubmitEditing.bind(this)}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          {...props}
        />
        {this.renderRight()}
        {/* {this.renderToggle()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 1,
    // borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    // fontWeight: "500",
    color: theme.colors.black,
    height: theme.sizes.base * 2.5,
    paddingHorizontal: theme.sizes.base*.75 
  },
  toggle: {
    position: "absolute",
    // alignItems: "flex-end",
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: 0,
    right: 0
  }
});