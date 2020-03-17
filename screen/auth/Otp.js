import React, { Component } from 'react'
import { StyleSheet, Alert, AsyncStorage, } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput } from '../../components'
import { theme } from '../../constants';
import { SwitchActions, StackActions, NavigationActions } from 'react-navigation';

export default class Otp extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      async_role: '',
      confirmModal: false
    };
  }

  async componentDidMount(){
    try {
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: role})
      console.log(this.state.async_role)
    } catch (e) {
      console.error(e)
    }
  }

  navigateHelper(){
    const {dispatch} = this.props.navigation
    const reset = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Kategori' }),
        // NavigationActions.navigate({ routeName: 'NamaLengkap' }),
      ],
    })
    dispatch(SwitchActions.jumpTo({routeName: 'formStack'}))
    dispatch(reset)
    console.log()
  }

  navigateMajikan(){
    this.props.navigation.navigate('NamaLengkap')
  }

  alertVerified(){
    Alert.alert(
      'Berhasil',
      'Anda akan dirahkan ke halaman pengisian data untuk informasi lebih lanjut.',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'Lanjutkan', onPress: () => this.state.async_role == 'helper' ? this.navigateHelper() : this.navigateMajikan()},
      ],
      {cancelable: false},
    )
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.parent}>
        <View padding={[theme.sizes.base*1.5, 0]} center style={[GlobalStyle.mt_SafeArea]}>
          <View row center>
            <Text bold primary>Helper</Text>
            <Text bold secondary>Q</Text>
          </View>
          <Text h1>
            Verifikasi OTP
          </Text>
        </View>
        <View padding={theme.sizes.base*1.5}>
          <Text center>Masukkan Kode OTP yang sudah dikirim ke nomor handphone anda</Text>
          <View middle center margin={[theme.sizes.base, 0]} row >
            <Text bold>HQ - </Text>
            <CustomInput
              number
              value={this.state.email}
              onChangeText={(one)=>this.setState({one: one}) || this.inputs['inputTwo'].focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              selectTextOnFocus
              onRef={(ref) => { this.inputs['inputOne'] = ref }}
              maxLength={1}
              style={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <CustomInput
              number
              value={this.state.email}
              onChangeText={(two)=>this.setState({two: two}) || this.inputs['inputThree'].focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              selectTextOnFocus
              onRef={(ref) => { this.inputs['inputTwo'] = ref }}
              maxLength={1}
              style={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <CustomInput
              number
              value={this.state.email}
              onChangeText={(three)=>this.setState({three: three}) || this.inputs['inputFour'].focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              selectTextOnFocus
              onRef={(ref) => { this.inputs['inputThree'] = ref }}
              maxLength={1}
              style={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <CustomInput
              number
              value={this.state.email}
              onChangeText={(four)=>this.setState({four: four}) || this.inputs['inputFive'].focus()}
              blurOnSubmit={false}
              returnKeyType={'next'}
              selectTextOnFocus
              onRef={(ref) => { this.inputs['inputFour'] = ref }}
              maxLength={1}
              style={{textAlign: 'center', fontWeight: 'bold'}}
            />
            <CustomInput
              number
              value={this.state.email}
              onChangeText={(five)=>this.setState({five: five})}
              onSubmitEditing={null}
              returnKeyType={'done'}
              selectTextOnFocus
              onRef={(ref) => { this.inputs['inputFive'] = ref }}
              maxLength={1}
              style={{textAlign: 'center', fontWeight: 'bold'}}
            />
          </View>
          <View margin={[theme.sizes.base, 0]}>
            <Button color='primary' onPress={()=> this.alertVerified()}>
              <Text center bold white>Verifikasi</Text>
            </Button>
          </View>
        </View>
        {/* <Modal 
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
        </Modal> */}
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
