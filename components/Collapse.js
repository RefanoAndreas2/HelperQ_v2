import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Touch } from "../components";
import { theme } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Collapse extends Component {
  constructor(props) {
    super(props);

    this.arrows = {
      up: "arrow-drop-up",
      down: "arrow-drop-down",
    };

    this.state = {
      title: props.title,
      leftIcon: props.leftIcon,
      expanded: true,
    };
  }

  toggle() {}

  render() {
    let arrow = this.arrows["down"];
    if (this.state.expanded) {
      arrow = this.arrows["up"];
    }

    const backOffset = this.state.expanded ? -theme.sizes.base * 2 : 0;

    return (
      <View>
        <View
          rounded
          color={this.state.expanded ? theme.colors.primary : "white"}
          ovHidden
          radius={theme.sizes.base / 2}
          shadow
          margin={[0, theme.sizes.base]}
          style={{elevation: 3}}
        >
          <Touch
            onPress={() => this.setState({ expanded: !this.state.expanded })}
          >
            <View row padding={theme.sizes.base} row center>
              <Icon
                name={this.state.leftIcon}
                size={theme.sizes.base * 1.5}
                color={this.state.expanded ? "white" : "black"}
              />
              <Text
                style={{
                  flex: 1,
                  textTransform: "uppercase",
                  marginLeft: theme.sizes.base,
                  color: this.state.expanded ? "white" : "black",
                }}
              >
                {this.state.title}
              </Text>
              <Icon
                name={arrow}
                size={theme.sizes.base * 1.5}
                color={this.state.expanded ? "white" : "black"}
              />
            </View>
          </Touch>
        </View>
        <View
          style={{ elevation: 0 }}
          height={this.state.expanded ? "auto" : 0}
          ovHidden
          marginTop={backOffset}
          paddingBottom={this.state.expanded?theme.sizes.base:0}
          marginBottom={this.state.expanded?0:theme.sizes.base}
        >
          <View
            padding={[theme.sizes.base*3, theme.sizes.base, theme.sizes.base]}
            color={"white"}
            radius={theme.sizes.base / 2}
            shadow
            margin={[0, theme.sizes.base / 2]}
          >
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
