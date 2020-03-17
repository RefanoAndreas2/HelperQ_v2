import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput } from '../../components'
import { theme } from '../../constants';

export default class Forget extends Component {
  constructor(props) {
    super(props);
    this.inputs = {}
    this.state = {
      email: ''
    };
  }

  alertReset(){
    const {navigate} = this.props.navigation
    Alert.alert(
      'Berhasil',
      'Silahkan cek email anda untuk mereset password',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'OK', onPress: () => navigate('Login')},
      ],
      {cancelable: false},
    )
  }

  render() {
    return (
      <View style={styles.parent}>
        <View padding={[theme.sizes.base*1.5, 0]} center style={[GlobalStyle.mt_SafeArea]}>
          <View row center>
            <Text bold primary>Helper</Text>
            <Text bold secondary>Q</Text>
          </View>
          <Text h1>
            Lupa Password
          </Text>
        </View>
        <View padding={theme.sizes.base*1.5}>
          <Text center>Masukkan alamat email yang sudah terdaftar untuk mendapatkan reset link.</Text>
          <View margin={[theme.sizes.base, 0]}>
            <CustomInput
              email
              label={'Email'}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(email)=>this.setState({email: email})}
              blurOnSubmit={false}
              returnKeyType={'next'}
              onRef={(ref) => { this.inputs['inputEmail'] = ref }}
              onSubmitEditing={() => this.inputs['inputPhone'].focus()}
            />
          </View>
          <View margin={[theme.sizes.base, 0]}>
            <Button color='primary' onPress={()=> this.alertReset()}>
              <Text center bold white>Kirim Link</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white'
  }
})
