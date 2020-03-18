import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView, Alert } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {NavigationActions} from 'react-navigation'

export default class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.inputs = {}
    this.state = {
      oldPass: '',
      newPass: '',
      retypePass: ''
    }
  }

  static navigationOptions = {
    title: 'Change Password'
  }

  successAlert(){
    const back = NavigationActions.back()
    const {dispatch} = this.props.navigation
    Alert.alert(
      'Berhasil',
      'Password baru anda berhasil tersimpan',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'Lanjutkan', onPress: () => dispatch(back)},
      ],
      {cancelable: false},
    )
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.parent}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View padding={theme.sizes.base}>
            <CustomInput
              secure
              label={'Password Lama'}
              placeholder={'Masukan Password Lama'}
              value={this.state.oldPass}
              onChangeText={(value)=>this.setState({oldPass: value})}
              blurOnSubmit={false}
              returnKeyType={'next'}
              onRef={(ref)=>this.inputs['oldPass']=ref}
              onSubmitEditing={()=>this.inputs['newPass'].focus()}
            />
            <CustomInput
              secure
              label={'Password Baru'}
              placeholder={'Masukan Password Baru'}
              value={this.state.newPass}
              onChangeText={(value)=>this.setState({newPass: value})}
              blurOnSubmit={false}
              returnKeyType={'next'}
              onRef={(ref)=>this.inputs['newPass']=ref}
              onSubmitEditing={()=>this.inputs['retypePass'].focus()}
            />
            <CustomInput
              secure
              label={'Ulangi Password Baru'}
              placeholder={'Masukan ulang Password Baru'}
              value={this.state.retypePass}
              onChangeText={(value)=>this.setState({retypePass: value})}
              blurOnSubmit={true}
              returnKeyType={'done'}
              onRef={(ref)=>this.inputs['retypePass']=ref}
              onSubmitEditing={() => null}
            />
          </View>
        </KeyboardAwareScrollView>
        <View padding={theme.sizes.base}>
          <Button color={'primary'} onPress={() => this.successAlert()}>
            <Text white bold center>Simpan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = GlobalStyle
