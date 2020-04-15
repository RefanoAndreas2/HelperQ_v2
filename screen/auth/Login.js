import React, { Component } from 'react'
import { StyleSheet, Modal, AsyncStorage } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput } from '../../components'
import {theme} from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Base from '../../Utils/Base'

export default class Login extends Base {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      roleModal: false,
      role: '',
      loginForm : {email : '', password : ''},
    };
  }

  async componentDidMount(){
    var token = await AsyncStorage.getItem('token')
    if(token != null){
      this.props.navigation.navigate('Home')
    }
  }
  async componentWillUnmount(){

  }

  async changeInput(value, type){
    var form = this.state.loginForm
    form[type] = value
    await this.setState({loginForm : form})
  }

  async login(){
    try{
      var response = await this.axios.post(this.url + '/auth/login', this.state.loginForm,{
        headers:{
          'Content-Type': 'application/json'
        }
      })

      if(response.data.status == 'success'){
        await AsyncStorage.setItem('token', response.data.token)
        this.props.navigation.navigate('Home')
      }
    }
    catch(e){
      console.log(e)
    }
  }

  daftar = async(role) => {
    this.setState({roleModal: !this.state.roleModal})
    try {
      await AsyncStorage.setItem('ASYNC_ROLE', role)
      this.props.navigation.navigate('formStack')
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <KeyboardAwareScrollView enableOnAndroid style={styles.parent}>
        <View padding={[theme.sizes.base*1.5, 0]} center style={[GlobalStyle.mt_SafeArea]}>
          <View row center>
            <Text bold primary>Helper</Text>
            <Text bold secondary>Q</Text>
          </View>
          <Text h1>Masuk</Text>
        </View>
        <View flex={1} padding={0, theme.sizes.base*1.5} style={styles.container}>
          <View style={{alignSelf: 'stretch'}}>
            <CustomInput
              email
              label={'Email'}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(value)=>this.changeInput(value, 'email')}
              blurOnSubmit={false}
              returnKeyType={'next'}
              onRef={(ref)=>this.inputs['inputEmail']=ref}
              onSubmitEditing={()=>this.inputs['inputPassword'].focus()}
              editable={true}
            />
            <CustomInput
              secure
              label={'Password'}
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={(value)=>this.changeInput(value, 'password')}
              blurOnSubmit={false}
              returnKeyType={'done'}
              onRef={(ref)=>this.inputs['inputPassword']=ref}
              onSubmitEditing={null}
              editable={true}
            />
            <View marginTop={theme.sizes.base}>
              <Button color={theme.colors.primary} onPress={()=> this.login()}>
                <Text center bold white>Masuk</Text>
              </Button>
            </View>
            <View marginTop={theme.sizes.base}>
              <Button onPress={() => navigate('Forget')}>
                <Text center underline>Lupa password</Text>
              </Button>
            </View>
          </View>
        </View>
        <View padding={theme.sizes.base*1.5}>
          <Text center>Belum punya akun?</Text>
          <Button style={{alignSelf: 'stretch'}} onPress={() => this.setState({roleModal: !this.state.roleModal})}>
            <Text center underline bold>Daftar</Text>
          </Button>
        </View>

        <Modal 
          transparent={true}
          visible={this.state.roleModal} 
          onRequestClose={()=>this.setState({roleModal: !this.state.roleModal})}
          animationType='fade'
        >
          <View flex={1} middle color='backdrop'>
            <View margin={theme.sizes.base*1.5} color='white' radius={theme.sizes.radius}>
              <View padding={theme.sizes.base}>
                <Text h3 center>Daftar Sebagai</Text>
              </View>
              <View row padding={theme.sizes.base}>
                <View flex={1}>
                  <Button color={'primary'} onPress={()=>this.daftar('helper')}>
                    <Text center bold white>Helper</Text>
                  </Button>
                </View>
                <View width={theme.sizes.base} />
                <View flex={1}>
                  <Button color='secondary' onPress={()=>this.daftar('majikan')}>
                    <Text center bold white>Majikan</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});