import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';

class PrivacyPolicy extends Component {
  static navigationOptions = {
    title: 'Privacy Policy'
  }
  render() {
    return (
      <ScrollView style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text title>Privacy Policy</Text>
          <Text >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, alias nam recusandae placeat officiis repellat reiciendis magni provident accusamus amet aut excepturi culpa, modi voluptatem! Culpa harum dolorum quibusdam? Maiores!
          </Text>
        </View>
      </ScrollView>
    )
  }
}

class TermsAndCondition extends Component {
  static navigationOptions = {
    title: 'Terms and Condition'
  }
  render() {
    return (
      <ScrollView style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text title>Privacy Policy</Text>
          <Text >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, alias nam recusandae placeat officiis repellat reiciendis magni provident accusamus amet aut excepturi culpa, modi voluptatem! Culpa harum dolorum quibusdam? Maiores!
          </Text>
        </View>
      </ScrollView>
    )
  }
}

export {PrivacyPolicy, TermsAndCondition}

const styles = GlobalStyle
