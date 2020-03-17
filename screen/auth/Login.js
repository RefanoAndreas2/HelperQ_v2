import React, { Component } from 'react'
import { StyleSheet, Modal, AsyncStorage } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput } from '../../components'
import {theme} from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      email: '',
      password: '',
      roleModal: false,
      role: ''
    };
  }

  componentDidMount(){

  }
  componentWillUnmount(){

  }

  daftar = async(context, role) => {
    const {navigate} = context.props.navigation
    this.setState({roleModal: !this.state.roleModal})
    try {
      await AsyncStorage.setItem('ASYNC_ROLE', role)
      navigate('Signup')
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
              onChangeText={(value)=>this.setState({email: value})}
              blurOnSubmit={false}
              returnKeyType={'next'}
              onRef={(ref)=>this.inputs['inputEmail']=ref}
              onSubmitEditing={()=>this.inputs['inputPassword'].focus()}
            />
            <CustomInput
              secure
              label={'Password'}
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={(value)=>this.setState({password: value})}
              blurOnSubmit={false}
              returnKeyType={'done'}
              onRef={(ref)=>this.inputs['inputPassword']=ref}
              onSubmitEditing={null}
            />
            <View marginTop={theme.sizes.base}>
              <Button color={theme.colors.primary} onPress={()=> null}>
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
                  <Button color={'primary'} onPress={()=>this.daftar(this, 'helper')}>
                    <Text center bold white>Helper</Text>
                  </Button>
                </View>
                <View width={theme.sizes.base} />
                <View flex={1}>
                  <Button color='secondary' onPress={()=>this.daftar(this, 'majikan')}>
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