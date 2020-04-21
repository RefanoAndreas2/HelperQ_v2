import React, { Component, useState } from 'react'
import { 
  StyleSheet,
  Modal,
  ScrollView,
  AsyncStorage,
  Picker,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, CustomPicker } from '../../components'
import { theme, mocks } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator } from "react-navigation-stack";
import DateTimePicker from '@react-native-community/datetimepicker'
import CheckBox from 'react-native-check-box'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions } from 'react-navigation';
import Base from '../../Utils/Base'
import moment from 'moment'
// import ImagePicker from 'react-native-image-picker'

class Kategori extends Base {
  constructor(props) {
    super(props);
    this.state = {
      modalSistem:true,
      sistemKerja: '',
      kategori: mocks.categories,
      token : '',
      category_arr : [],
      selected_category : {},
      sub_category : [],
    };
  }

  static navigationOptions = {
    title: 'Kategori Pekerjaan',
  }

  async componentDidMount(){
    // const reset = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: 'Kategori'})]
    // })
    // this.props.navigation.dispatch(reset)
    // await this.setState({kategori: this.props.categories})
    // const a = await AsyncStorage.getAllKeys()

    var token = await AsyncStorage.getItem('token')
    await this.setState({token : token})
    
    await this.get_category()
  }

  async get_category(){
    try{
        var response = await this.axios.get(this.url + '/helper-category', {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.data.status == 'success'){
            var data = response.data.data.data
            await this.setState({category_arr : data})
        }
    }
    catch(e){
        console.log(e)
    }
  }

  async chooseCategory(index){
    await this.setState({modalSistem: !this.state.modalSistem, selected_category: this.state.category_arr[index], sub_category : this.state.category_arr[index].helper_sub_category})
    // this.setState({modalSistem: !this.state.modalSistem, sistemKerja: 'kontrak'})
  }

  async selectSubCategory(index){
    var arr = {}
    arr.helper_sub_category = this.state.sub_category[index]
    await AsyncStorage.setItem('registerData', JSON.stringify(arr))
    this.props.navigation.navigate('NamaLengkap')
  }

  render(){
    const {navigate} = this.props.navigation
    const kategori = this.state.kategori
    const kontrak = _.filter(kategori, {kategori: 'kontrak'})
    const kasual = _.filter(kategori, {kategori: 'kasual'})
    return(
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {this.state.modalSistem ? null :
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text>Sistem kerja: <Text bold>{this.state.sistemKerja}</Text></Text>
            <Button border={theme.colors.primary} onPress={() => this.setState({modalSistem: !this.state.modalSistem})}>
              <View padding={[0,theme.sizes.base]}>
                <Text bold primary>Ganti</Text>
              </View>
            </Button>
          </View>
        }
        {this.state.modalSistem ? null :
          <View padding={[0, theme.sizes.base]}>
            {
              this.state.sub_category.map((data, index)=>(
                <View key={data.id} margin={[theme.sizes.base/2, 0]}>
                  <Button color='primary' onPress={() => this.selectSubCategory(index)}>
                    <Text white bold center>{data.name}</Text>
                  </Button>
                </View>
              ))
            }
          </View>
        }
        <Modal
          transparent={true}
          visible={this.state.modalSistem}
          onRequestClose={() => this.setState({modalSistem: !this.state.modalSistem})}
        >
          <View flex={1} middle color='backdrop'>
            <View margin={theme.sizes.base*1.5} color={'white'} radius={theme.sizes.radius}>
              <View padding={theme.sizes.base*1.5}>
                <Text center>Pilih sistem kerja</Text>
              </View>
              <View padding={theme.sizes.base*1.5}row>
                {
                  this.state.category_arr.map((data, index)=>(
                    <View flex={1} key={data.id} marginRight={theme.sizes.base/2}>
                      <Button
                        border={theme.colors.primary}
                        ripple={theme.colors.primary_light}
                        onPress={() => this.chooseCategory(index)}
                      >
                        <Text center bold primary>{data.name}</Text>
                      </Button>
                    </View>
                  )) 
                }
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

class NamaLengkap extends Base {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      genderOptions : [{id : '', title : 'Pilih Gender'}, {id : '1', title : 'Laki - Laki'}, {id : '0', title : 'Perempuan'}],
      async_role: '',
      datePicker: false,

      token : '',
      userData : {helper_sub_category : '', gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
      city_arr : [],
    };
  }

  async componentDidMount(){
    try{
      const async_role = await AsyncStorage.getItem('ASYNC_ROLE')
      if(async_role == 'helper'){
        var userData = await AsyncStorage.getItem('registerData')
        userData = JSON.parse(userData)
        await this.setState({userData : userData})
      }
      await this.setState({async_role: async_role})

      if(async_role == 'helper'){
        this.props.navigation.navigate('Kategori')
      }

      this.getCity()

    }catch(e){
      console.error(e)
    }
  }

  datePickerShow = () => {
    this.setState({datePicker: !this.state.datePicker})
  }

  tanggalLahir = (event, selectedDate) => {
    this.setState({datePicker: !this.state.datePicker, datebirth: selectedDate.toDateString()})
    this.inputs['inputPhone'].focus()
  }

  async changeInput(value, type){
    var user = this.state.userData
    user[type] = value

    if(type == 'birth_date'){
      user[type] = moment(value).format('DD MMMM YYYY')
      await this.setState({datePicker: !this.state.datePicker})
      this.inputs['inputPhone'].focus()
    }

    await this.setState({userData : user})
  }

  async getCity(){
    try{
      var response = await this.axios.get(this.url + '/city/all', {
          headers:{
              'Content-Type': 'application/json',
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data
          await this.setState({city_arr : data})
      }
  }
  catch(e){
      console.log(e)
  }
  }

  async toTribes(){
    var userData = this.state.userData
    // if(this.state.async_role == 'helper'){
    //   var registerData = await AsyncStorage.getItem('registerData')
    //   registerData = JSON.parse(registerData)
    //   userData.helper_sub_category = registerData
    // }
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate('KeturunanSuku')
  }

  render(){
    const {navigate} = this.props.navigation
    const genderOptions = this.state.genderOptions
    return(
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={100} style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text bold primary center>
            {this.state.async_role == 'majikan' ? 'Bagian 1 dari 4' : 'Bagian 1 dari 7'}
          </Text>
        </View>
        <View flex={1} padding={theme.sizes.base}>
          <CustomInput
            default
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            value={this.state.userData.name}
            onChangeText={(value)=>this.changeInput(value, 'name')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputName'] = ref }}
            onSubmitEditing={() => this.inputs['inputEmail'].focus()}
          />
          <CustomInput
            email
            label={'Email'}
            placeholder={'Email'}
            value={this.state.userData.email}
            onChangeText={(value)=>this.changeInput(value, 'email')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputEmail'] = ref }}
            onSubmitEditing={() => this.inputs['inputPlacebirth'].focus()}
          />
          <CustomPicker
            label={'Gender'}
            selectedValue={this.state.userData.gender}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'gender')}>
            {this.state.genderOptions.map((genderData, index) => (
              <Picker.Item key={index} label={genderData.title} value={genderData.id}/>
            ))}
          </CustomPicker>
          {/* <CustomInput
            default
            label={'Tempat Lahir'}
            placeholder={'Tempat Lahir'}
            value={this.state.placebirth}
            onChangeText={(placebirth)=>this.setState({placebirth: placebirth})}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputPlacebirth'] = ref }}
            onSubmitEditing={() => this.inputs['inputDatebirth'].focus()}
          /> */}

          <CustomPicker
            label={'Tempat Lahir'}
            selectedValue={this.state.userData.birth_place}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'birth_place')}>
            <Picker.Item label={'Pilih Tempat Lahir'} value={''}/>
            {this.state.city_arr.map((data, index) => (
              <Picker.Item key={index} label={data.name} value={data}/>
            ))}
          </CustomPicker>
          
          <CustomInput
            default
            label={'Tanggal Lahir'}
            placeholder={'Tanggal Lahir'}
            value={this.state.userData.birth_date}
            onFocus={() => Keyboard.dismiss() || this.datePickerShow()}
            onChangeText={(datebirth)=>console.log('asdasd', datebirth)}
            blurOnSubmit={false}
            returnKeyType={'next'}
            disabled
            onRef={(ref) => { this.inputs['inputDatebirth'] = ref }}
            onSubmitEditing={() => this.inputs['inputPhone'].focus()}
          />
          {this.state.datePicker && 
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={'date'}
              display="calendar"
              onChange={(event, selectedDate) => this.changeInput(selectedDate, 'birth_date')}
              // this.tanggalLahir(event, selectedDate)
            />
          }
          <CustomInput
            phone
            label={'No. Telp'}
            placeholder={'No. Telp'}
            value={this.state.userData.phone}
            onChangeText={(value)=>this.changeInput(value, 'phone')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputPhone'] = ref }}
            onSubmitEditing={() => this.inputs['inputWeight'].focus()}
          />
          {this.state.async_role == 'helper' && 
            <>
              <CustomInput
                number
                rightLabel={'KG'}
                label={'Berat Badan'}
                placeholder={'Berat Badan'}
                value={this.state.userData.weight}
                onChangeText={(value)=>this.changeInput(value, 'weight')}
                blurOnSubmit={false}
                returnKeyType={'next'}
                onRef={(ref) => { this.inputs['inputWeight'] = ref }}
                onSubmitEditing={() => this.inputs['inputHeight'].focus()}
              />
              <CustomInput
                number
                rightLabel={'CM'}
                label={'Tinggi Badan'}
                placeholder={'Tinggi Badan'}
                value={this.state.userData.height}
                onChangeText={(value)=>this.changeInput(value, 'height')}
                blurOnSubmit={false}
                returnKeyType={'done'}
                onRef={(ref) => { this.inputs['inputHeight'] = ref }}
                onSubmitEditing={() => null || Keyboard.dismiss()}
              />
            </>
          }
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => this.toTribes()}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

class KeturunanSuku extends Base {
  constructor(props) {
    super(props);
    this.inputs= {}
    this.state = {
      async_role: '',
      tribes_arr : [],
      religion_arr : [],
      marital_status_arr : [],
      city_arr : [],
      blood_type_arr : [],
      education_arr : [],
      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
    };
  }

  async componentDidMount(){
    try{
      const async_role = await AsyncStorage.getItem('ASYNC_ROLE')
      var userData = await AsyncStorage.getItem('registerData')
      userData = JSON.parse(userData)
      await this.setState({async_role: async_role, userData : userData})
      
      await this.get_tribes()
      await this.get_religion()
      await this.get_marital_status()
      await this.getCity()

      if(async_role == 'helper'){
        await this.get_bloodType()
        await this.get_education()
      }

    }catch(e){
      console.error(e)
    }
  }

  async get_tribes(){
    this.setState({tribes_arr : []})
    try{
        var response = await this.axios.get(this.url + '/tribe/all', {
            headers:{
              'Content-Type': 'application/json',
            }
        })
        if(response.data.status == 'success'){
            var data = response.data.data
            await this.setState({tribes_arr : data})
        }
    }
    catch(e){
      console.log(e)
    }
  }
  async get_religion(){
      this.setState({religion_arr : []})
      try{
          var response = await this.axios.get(this.url + '/religion/all', {
              headers:{
                'Content-Type': 'application/json',
              }
          })
          if(response.data.status == 'success'){
              var data = response.data.data
              await this.setState({religion_arr : data})
          }
      }
      catch(e){
        console.log(e)
      }
  }
  async get_marital_status(){
      this.setState({marital_status_arr : []})
      try{
          var response = await this.axios.get(this.url + '/marital-status/all', {
              headers:{
                  'Content-Type': 'application/json'
              }
          })
          if(response.data.status == 'success'){
              var data = response.data.data
              await this.setState({marital_status_arr : data})
          }
      }
      catch(e){
        console.log(e)
      }
  }

  async getCity(){
    try{
      var response = await this.axios.get(this.url + '/city/all', {
          headers:{
              'Content-Type': 'application/json',
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data
          await this.setState({city_arr : data})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  async get_bloodType(){
    try{
      var response = await this.axios.get(this.url + '/blood-type/all', {
          headers:{
              'Content-Type': 'application/json'
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data
          await this.setState({blood_type_arr : data})
      }
    }
    catch(e){
      console.log(e)
    }
  }

  async get_education(){
    try{
      var response = await this.axios.get(this.url + '/education/all', {
          headers:{
              'Content-Type': 'application/json'
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data
          await this.setState({education_arr : data})
      }
    }
    catch(e){
      console.log(e)
    }
  }

  async changeInput(value, type){
    var userData = this.state.userData
    userData[type] = value
    await this.setState({userData : userData})
  }

  async toNextPage(){
    var userData = this.state.userData
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate(this.state.async_role == 'helper' ? 'PengalamanKerja' : 'UploadKtp')
  }

  render(){
    const {navigate} = this.props.navigation
    return(
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={100} style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text primary bold center>
            {this.state.async_role == 'majikan' ? 'Bagian 2 dari 4' : 'Bagian 2 dari 7'}
          </Text>
        </View>
        <View padding={theme.sizes.base}>
          <CustomPicker
            label={'Keturunan Suku'}
            selectedValue={this.state.userData.tribes}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>this.changeInput(itemValue, 'tribes')}>
            <Picker.Item label={'Pilih Keturunan Suku'} value={''}/>
            {this.state.tribes_arr.map((data, index) => (
              <Picker.Item key={index} label={data.name} value={data}/>
            ))}
          </CustomPicker>
          {this.state.async_role == 'helper' &&
            <CustomPicker
              label={'Golongan Darah'}
              selectedValue={this.state.userData.blood_type}
              style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
              onValueChange={(itemValue) => this.changeInput(itemValue, 'blood_type') }>
              <Picker.Item label={'Pilih Golongan Darah'} value={''}/>
              {this.state.blood_type_arr.map((data, index) => (
                <Picker.Item key={index} label={data.name} value={data}/>
              ))}
            </CustomPicker>
          }
          <CustomPicker
            label={'Agama'}
            selectedValue={this.state.userData.religion}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>this.changeInput(itemValue, 'religion')}>
            <Picker.Item label={'Pilih Agama'} value={''}/>
            {this.state.religion_arr.map((data, index) => (
              <Picker.Item key={index} label={data.name} value={data}/>
            ))}
          </CustomPicker>
          {this.state.async_role == 'helper' &&
            <CustomPicker
              label={'Pendidikan'}
              selectedValue={this.state.userData.education}
              style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
              onValueChange={(itemValue) => this.changeInput(itemValue, 'education') }>
              <Picker.Item label={'Pilih Pendidikan'} value={''}/>
              {this.state.education_arr.map((data, index) => (
                <Picker.Item key={index} label={data.name} value={data}/>
              ))}
            </CustomPicker>
          }
          <CustomPicker
            label={'Status Perkawinan'}
            selectedValue={this.state.userData.marital_status}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>this.changeInput(itemValue, 'marital_status')}>
            <Picker.Item label={'Pilih Status Perkawinan'} value={''}/>
            {this.state.marital_status_arr.map((data, index) => (
              <Picker.Item key={index} label={data.name} value={data}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Lokasi Terkini'}
            selectedValue={this.state.userData.city}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'city')}>
            <Picker.Item label={'Pilih Lokasi Saat ini'} value={''}/>
            {this.state.city_arr.map((data, index) => (
              <Picker.Item key={index} label={data.name} value={data}/>
            ))}
          </CustomPicker>

          <CustomPicker
            label={'Punya Anak'}
            selectedValue={this.state.userData.have_children}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'have_children')}>
              <Picker.Item label={'Punya Anak?'} value='' />
              <Picker.Item label="Ya" value="1" />
              <Picker.Item label="Tidak" value="0" />
          </CustomPicker>

          {/* <CustomPicker
            label={'Jumlah Anak'}
            selectedValue={this.state.jumlahAnak}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({jumlahAnak: itemValue}) //checkpoint here, statenya
            }>
            {jumlahAnak_Opt.map((jumlahAnakData) => (
              <Picker.Item key={jumlahAnakData.id} label={jumlahAnakData.title} value={jumlahAnakData.id}/>
            ))}
          </CustomPicker> */}
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => this.toNextPage()}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

class PengalamanKerja extends Base {
  constructor(props) {
    super(props)
    this.inputs = {}
    this.state = {
      async_role: '',
      kategori: '',
      kategoriPekerjaan_Opt: mocks.categories,
      gaji: '',
      menginap: '',
      menginap_Opt: mocks.form_PengalamanKerja.menginap,
      takutAnjing: '',
      takutAnjing_Opt: mocks.form_PengalamanKerja.takutAnjing,
      luarNegeri: '',
      luarNegeri_Opt: mocks.form_PengalamanKerja.luarNegeri,
      bahasaInggris: '',
      bahasaInggris_Opt: mocks.form_PengalamanKerja.bahasaInggris,

      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
    };
  }

  async componentDidMount(){
    try {
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      var userData = await AsyncStorage.getItem('registerData')
      userData = JSON.parse(userData)
      await this.setState({async_role: role, userData : userData})
    } catch (e) {
      console.error(e)
    }
  }

  async changeInput(value, type){
    var userData = this.state.userData
    userData[type] = value
    await this.setState({userData : userData})
  }

  async toNextPage(){
    var userData = this.state.userData
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate('Penempatan')
  }

  render(){
    const {navigate} = this.props.navigation
    const kategoriPekerjaan_Opt = this.state.kategoriPekerjaan_Opt
    const menginap_Opt = this.state.menginap_Opt
    const takutAnjing_Opt = this.state.takutAnjing_Opt
    const luarNegeri_Opt = this.state.luarNegeri_Opt
    const bahasaInggris_Opt = this.state.bahasaInggris_Opt
    return(
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={100} style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text primary bold center>Bagian 3 dari 7</Text>
        </View>
        <View padding={theme.sizes.base}>

          <CustomPicker
            label={'Kategori Pekerjaan'}
            selectedValue={this.state.kategori}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({kategori: itemValue}) //checkpoint here, statenya
            }>
            {kategoriPekerjaan_Opt.map((kategoriData) => (
              <Picker.Item key={kategoriData.id} label={kategoriData.title} value={kategoriData.id}/>
            ))}
          </CustomPicker>

          <CustomInput
            number
            label={'Gaji per Bulan (Rp)'}
            placeholder={'Gaji per Bulan (Rp)'}
            value={this.state.userData.requested_price}
            onChangeText={(value)=>this.changeInput(value, 'requested_price')}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={(value)=>this.changeInput(value, 'requested_price')}
          />
          <CustomPicker
            label={'Menginap (Live In)'}
            selectedValue={this.state.userData.could_live_in}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'could_live_in') }>
              <Picker.Item label={'Apakah Menginap?'} value='' />
              <Picker.Item label="Ya" value="1" />
              <Picker.Item label="Tidak" value="0" />
          </CustomPicker>
          <CustomPicker
            label={'Ketakutan Terhadap Anjing'}
            selectedValue={this.state.userData.is_afraid_dog}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'is_afraid_dog')}>
            <Picker.Item label={'Apakah Takut Anjing?'} value='' />
            <Picker.Item label="Ya" value="1" />
            <Picker.Item label="Tidak" value="0" />
          </CustomPicker>
          <CustomPicker
            label={'Pengalaman Kerja di Luar Negeri'}
            selectedValue={this.state.userData.have_work_abroad}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'have_work_abroad') }>
            <Picker.Item label={'Apakah Pernah Kerja di LN?'} value='' />
            <Picker.Item label="Ya" value="1" />
            <Picker.Item label="Tidak" value="0" />
          </CustomPicker>
          <CustomPicker
            label={'Kemampuan Berbahasa Inggris'}
            selectedValue={this.state.userData.is_understood_english}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) => this.changeInput(itemValue, 'is_understood_english') }>
            <Picker.Item label={'Apakah Mengerti B.Inggris?'} value='' />
            <Picker.Item label="Ya" value="1" />
            <Picker.Item label="Tidak" value="0" />
          </CustomPicker>
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => this.toNextPage()}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

class Penempatan extends Base {
  constructor(props) {
    super(props);
    this.inputs = {}
    this.state = {
      search: '',
      kota: mocks.form_Penempatan.kota,

      async_role : '',
      city_arr : [],
      temp_city : [],
      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
    };
  }

  async componentDidMount(){
    const role = await AsyncStorage.getItem('ASYNC_ROLE')
    var userData = await AsyncStorage.getItem('registerData')
    userData = JSON.parse(userData)
    await this.setState({async_role: role, userData : userData})

    await this.getCity()
  }

  async getCity(){
    try{
      await this.setState({city_arr : []})

      var response = await this.axios.get(this.url + '/city/all?name='+this.state.search, {
          headers:{
              'Content-Type': 'application/json'
          }
      })

      if(response.data.status == 'success'){
          var data = response.data.data
          var temp_city = this.state.temp_city
          for(var x in data){
              data[x].checked = false

              if(temp_city.length > 0){
                  for(var y in temp_city){
                      if(data[x].id == temp_city[y].id){
                          data[x].checked = true
                      }
                  }
              }

          }
          await this.setState({city_arr : data})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  kotaCheck=(id)=>{
    const kota = this.state.kota
    kota[id].checked = !kota[id].checked
    this.setState({kota: kota})
  }

  async citySelected(index){
    var city = this.state.city_arr
    city[index].checked = !city[index].checked
    await this.setState({city_arr : city})

    var data = this.state.city_arr
    
    var arr_data = []

    for(var x in data){
        if(data[x].checked){
            arr_data.push(data[x])
        }
    }

    await this.setState({temp_city : arr_data})
  }

  async searchCity(value){
    await this.setState({search : value})
    await this.getCity()
  }

  async toNextPage(){
    var userData = this.state.userData
    userData.selected_work_at = this.state.temp_city
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate('Keterampilan')
  }

  render(){
    const { navigate } = this.props.navigation
    return(
      <View style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text primary bold center>Bagian 4 dari 7</Text>
        </View>
        <View padding={theme.sizes.base}>
          <CustomInput
            label={'Cari Kota'}
            placeholder={'Masukkan Nama Kota'}
            onChangeText={(value)=>this.searchCity(value)}
          />
        </View>
        <View flex={1} padding={[0, theme.sizes.base]}>
          <Text>Bersedia ditempatkan di :</Text>
          <View marginTop={theme.sizes.base}>
            <FlatList
              data={this.state.city_arr}
              renderItem={({item, index}) =>
                <CheckBox
                  style={{paddingVertical: theme.sizes.base*.25}}
                  onClick={() => this.citySelected(index)} 
                  isChecked={item.checked} 
                  checkBoxColor={theme.colors.primary}
                  uncheckedCheckBoxColor={theme.colors.black_t30}
                  rightText={<Text >{item.name}</Text>}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => this.toNextPage()}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class Keterampilan extends Base {
  constructor(props) {
    super(props);
    this.state = {
      skill: mocks.form_Keterampilan.skill,

      async_role : '',
      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
      skill_arr : [],
      temp_skill : [],
    };
  }

  async componentDidMount(){
    const role = await AsyncStorage.getItem('ASYNC_ROLE')
    var userData = await AsyncStorage.getItem('registerData')
    userData = JSON.parse(userData)
    await this.setState({async_role: role, userData : userData})

    await this.get_data()
  }

  async get_data(){
    try{
      var response = await this.axios.get(this.url + '/skill/all', {
          headers:{
              'Content-Type': 'application/json'
          }
      })

      if(response.data.status == 'success'){
          var data = response.data.data
          for(var x in data){
              data[x].checked = false
          }
          await this.setState({skill_arr : data})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  async skillSelected(index){
    var skill = this.state.skill_arr
    skill[index].checked = !skill[index].checked
    await this.setState({skill_arr : skill})

    var data = this.state.skill_arr
    
    var arr_data = []

    for(var x in data){
        if(data[x].checked){
            arr_data.push(data[x])
        }
    }

    await this.setState({temp_skill : arr_data})
  }

  async toNextPage(){
    var userData = this.state.userData
    userData.selected_skill = this.state.temp_skill
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate('UploadKtp')
  }

  skillCheck=(id)=>{
    const skill = this.state.skill
    skill[id].checked = !skill[id].checked
    this.setState({skill: skill})
  }

  render(){
    const {navigate} = this.props.navigation
    return(
      <View style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text primary bold center>Bagian 5 dari 7</Text>
        </View>
        <View flex={1} padding={theme.sizes.base}>
          <Text>Keterampilan :</Text>
          <View marginTop={theme.sizes.base}>
            <FlatList
              data={this.state.skill_arr}
              renderItem={({item, index}) =>
                <CheckBox
                  style={{paddingVertical: theme.sizes.base*.25}}
                  onClick={() => this.skillSelected(index)} 
                  isChecked={item.checked} 
                  checkBoxColor={theme.colors.primary}
                  uncheckedCheckBoxColor={theme.colors.black_t30}
                  rightText={<Text >{item.name}</Text>}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => this.toNextPage()}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class UploadKtp extends Base {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '',
      ktpPlaceholder: 
      'https://lh3.googleusercontent.com/proxy/DJvQQ62TCjGmHE3iH2Gf74ANDDUIPIwvwEsVLjyVHsn6Xr72EVaHC68-acHzg1vWNvOBj9qB11McbSW1290',
      ktpData : '',
      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
    };
  }

  async componentDidMount(){
    try{
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      var userData = await AsyncStorage.getItem('registerData')
      userData = JSON.parse(userData)
      await this.setState({async_role: role, userData : userData})
    }catch(e){
      console.error(e)
    }
  }

  async choosePhoto(){
    // ImagePicker.showImagePicker(async(response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             // arr.picture = response.data
    //             // arr.image_display = {uri : response.uri}

    //             await this.setState({ktpPlaceholder : response.uri, ktpData : response.data})
    //         }
    //     });
  }

  async toNextPage(){
    var userData = this.state.userData
    userData.id_card = this.state.ktpData
    await AsyncStorage.setItem('registerData', JSON.stringify(userData))
    this.props.navigation.navigate('UploadFotoProfil')
  }

  render(){
    const {navigate} = this.props.navigation
    return(
      <View style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text bold center primary>
            {this.state.async_role == 'helper' ? 'Bagian 6 dari 7' : 'Bagian 3 dari 4'}
          </Text>
        </View>
        <View flex={1} padding={theme.sizes.base}>
          <Text center>Upload Foto KTP</Text>
          <Image
            style={{
              height: (Dimensions.get('window').width-(theme.sizes.padding*2))/4*3,
              backgroundColor: theme.colors.black_t90,
              borderRadius: theme.sizes.base*.5,
              marginVertical: theme.sizes.base*1.5
            }}
            source={{uri: this.state.ktpPlaceholder}}
          />
          <Button border={theme.colors.primary} onPress={()=>this.choosePhoto()}>
            <Text primary bold center>Upload Photo</Text>
          </Button>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => this.toNextPage()}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

class UploadFotoProfil extends Base {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '',
      // imgPlaceholder: 'https://source.unsplash.com/featured/?person',
      imgPlaceholder : this.no_user_img,
      imageData : '',
      helperPlaceholder: mocks.form_UploadFotoProfil.helperPlaceholder,
      userData : {gender : '', tribes : '', blood_type : '', religion : '', education : '', marital_status : '', have_children : '', could_live_in : '', is_afraid_dog : '', have_work_abroad : '', is_understood_english : '', selected_work_at : '', selected_skill : '', city : '', birth_place : ''},
      userType : {},
      photo_arr : [{image_display : this.no_user_img}],
    };
  }

  async componentDidMount(){
    try{
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      var userData = await AsyncStorage.getItem('registerData')
      userData = JSON.parse(userData)
      await this.setState({async_role: role, userData : userData})
      await this.get_type()
    }catch(e){
      console.error(e)
    }
  }

  async simpanVerified(){
    Alert.alert(
      'Disimpan',
      'Terima kasih telah mengisi data, anda bisa melanjutkan ke halaman utama',
      [
        {text: 'Lanjutkan', onPress: () => this.props.navigation.navigate('Home')},
      ],
      {cancelable: false},
    )
  }

  async get_type(){
    try{
      var response = await this.axios.get(this.url + '/type?name='+this.state.async_role, {
          headers:{
              'Content-Type': 'application/json'
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data.data[0]
          await this.setState({userType : data})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  async choosePhoto(){
    // ImagePicker.showImagePicker(async(response) => {
    //   if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //   } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //       console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //       // await this.setState({imgPlaceholder : {uri : response.uri}, imageData : response.data})

    //       if(this.state.async_role == 'majikan'){
    //         await this.setState({photo_arr : [{image_display : {uri : response.uri}, picture : response.data, is_primary : 1}]})
    //       }
    //       else{
    //         var arr_photo = this.state.photo_arr
    //         var arr = {}
    //         arr.picture = response.data
    //         arr.image_display = {uri : response.uri}
    //         arr.is_primary = 1
    //         if(arr_photo.length > 0){
    //             arr.is_primary = 0
    //         }
    //         arr_photo.push(arr)
  
    //         await this.setState({photo_arr : arr_photo})
    //       }
    //   }
    // });
  }

  async saveData(){
    console.log(this.state.photo_arr[0])
    try{
      var arr_picture = this.state.photo_arr

      var userData = this.state.userData
      var data = {}

      data.name = userData.name
      data.email = userData.email
      data.phone = userData.phone
      data.gender = userData.gender
      data.tribes = userData.tribes
      data.religion = userData.religion
      data.marital_status = userData.marital_status
      data.have_children = userData.have_children
      data.city = userData.city
      data.birth_date = userData.birth_date
      data.birth_place = userData.birth_place
      data.id_card = userData.id_card

      if(this.state.async_role == 'helper'){
        data = userData
      }

      data.arr_picture = arr_picture
      data.type = this.state.userType

      console.log(data)
      
      var response = await this.axios.post(this.url + '/auth/register', data, {
          headers:{
              'Content-Type': 'application/json'
          }
      })
      if(response.data.status == 'success'){

        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('user_type', data.type.name)
        await this.simpanVerified()
      }
    }
    catch(e){
        console.log(e)
    }
  }

  async setPrimary(index){
    var photo = this.state.photo_arr
    for(var x in photo){
        photo[x].is_primary = 0
    }
    photo[index].is_primary = 1
    this.setState({photo_arr : photo})
  }

  render(){
    const {navigate} = this.props.navigation
    return(
      <View style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text bold center primary>
            {this.state.async_role == 'helper' ? 'Bagian 7 dari 7' : 'Bagian 4 dari 4'}
          </Text>
        </View>
        <View flex={1}>
          <View padding={theme.sizes.base}>
            <Text center>Upload Foto Profil</Text>
            {this.state.async_role == 'majikan' ?
              <>
                <View center>
                  <Image
                    style={{
                      width: theme.sizes.base*10,
                      height: theme.sizes.base*10,
                      backgroundColor: theme.colors.black_t90,
                      borderRadius: theme.sizes.base*.5,
                      marginTop: theme.sizes.base*1.5
                    }}
                    source={this.state.photo_arr[0].image_display}
                  />
                </View>
                <View marginTop={theme.sizes.base*1.5}>
                  <Button border={theme.colors.primary} onPress={()=>this.choosePhoto()}>
                    <Text primary bold center>Upload Photo</Text>
                  </Button>
                </View>
              </>
            :
              <FlatList
                data={this.state.photo_arr}
                renderItem={({item, index}) => 
                  <View flex={1/3}>
                    <View padding={theme.sizes.base*.25}>
                      <Image
                        style={{
                          aspectRatio: 1,
                          backgroundColor: theme.colors.black_t90,
                          borderRadius: theme.sizes.base*.5,
                        }}
                        source={item.image_display}
                      />
                      {
                        item.is_primary ? <Text primary bold center>Foto Utama</Text> : 
                        <Button smallHeight border={theme.colors.primary} style={{marginTop: theme.sizes.base*.5}} onPress={()=>this.setPrimary(index)}>
                          <Text primary bold center>Pilih Sbg Utama</Text>
                        </Button>
                      }
                      <View position={'absolute'} style={{right: theme.sizes.base*.25, top: theme.sizes.base*.5}}>
                        <Icon.Button name={'times'} backgroundColor={'transparent'} padding={0} color={theme.colors.white} onPress={() => null}/>
                        {/* <TouchableHighlight activeOpacity={0.5} underlayColor={theme.colors.primary_light} onPress={() => null}>
                        </TouchableHighlight> */}
                      </View>
                    </View>
                  </View>
                }
                keyExtractor={item => item.id}
                numColumns={3}
                ListHeaderComponent={() => 
                  <View color='white' paddingBottom={theme.sizes.base}>
                    <Button border={theme.colors.primary} onPress={()=>this.choosePhoto()}>
                      <Text primary bold center>Upload Photo</Text>
                    </Button>
                  </View>
                }
                stickyHeaderIndices={[0]}
                style={{marginTop: theme.sizes.base*.5}}
              />
            }
          </View>
        </View>
        
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => this.saveData()}>
            <Text white bold center>Simpan</Text>
          </Button>
        </View>
      </View>
    )
  }
}

export {
  Kategori,
  KeturunanSuku,
  NamaLengkap,
  PengalamanKerja,
  Penempatan,
  Keterampilan,
  UploadKtp,
  UploadFotoProfil
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
