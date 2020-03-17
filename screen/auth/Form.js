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





class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSistem:true,
      sistemKerja: '',
      kategori: mocks.categories
    };
  }

  static navigationOptions = {
    title: 'Kategori Pekerjaan',
  }

  componentDidMount(){
    // const reset = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: 'Kategori'})]
    // })
    // this.props.navigation.dispatch(reset)
    // await this.setState({kategori: this.props.categories})
    // const a = await AsyncStorage.getAllKeys()
  }

  render(){
    const {navigate} = this.props.navigation
    const kategori = this.state.kategori
    const kontrak = _.filter(kategori, {kategori: 'kontrak'})
    const kasual = _.filter(kategori, {kategori: 'kasual'})
    // console.log(kontrak)
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
            { this.state.sistemKerja == 'kontrak' ?
              kontrak.map(kontrakData => (
                <View key={kontrakData.id} margin={[theme.sizes.base/2, 0]}>
                  <Button color='primary' onPress={() => navigate('NamaLengkap')}>
                    <Text white bold center>{kontrakData.title}</Text>
                  </Button>
                </View>
              )):
              kasual.map(kasualData => (
                <View key={kasualData.id} margin={[theme.sizes.base/2, 0]}>
                  <Button color='primary' onPress={() => navigate('NamaLengkap')}>
                    <Text white bold center>{kasualData.title}</Text>
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
                <View flex={1} marginRight={theme.sizes.base/2}>
                  <Button
                    border={theme.colors.primary}
                    ripple={theme.colors.primary_light}
                    onPress={() => this.setState({modalSistem: !this.state.modalSistem, sistemKerja: 'kontrak'})}
                  >
                    <Text center bold primary>Kontrak</Text>
                  </Button>
                </View>
                <View flex={1} marginRight={theme.sizes.base/2}>
                  <Button
                    border={theme.colors.primary}
                    ripple={theme.colors.primary_light}
                    onPress={() => this.setState({modalSistem: !this.state.modalSistem, sistemKerja: 'kasual'})}
                  >
                    <Text center bold primary>Kasual</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}





class NamaLengkap extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      name: '',
      email: '',
      genderOptions: mocks.form_NamaLengkap.gender,
      gender: '',
      placebirth: '',
      datebirth: '',
      phone: '',
      address: '',
      weight: '',
      height: '',
      async_role: '',
      date: new Date(),
      datePicker: false,
    };
  }

  async componentDidMount(){
    try{
      const async_role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: async_role})
      console.log(this.state.async_role)
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
            value={this.state.name}
            onChangeText={(name)=>this.setState({name: name})}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputName'] = ref }}
            onSubmitEditing={() => this.inputs['inputEmail'].focus()}
          />
          <CustomInput
            email
            label={'Email'}
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={(email)=>this.setState({email: email})}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputEmail'] = ref }}
            onSubmitEditing={() => this.inputs['inputPlacebirth'].focus()}
          />
          <CustomPicker
            label={'Gender'}
            selectedValue={this.state.gender}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({gender: itemValue})
            }>
            {genderOptions.map(genderData => (
              <Picker.Item key={genderData.id} label={genderData.title} value={genderData.id}/>
            ))}
          </CustomPicker>
          <CustomInput
            default
            label={'Tempat Lahir'}
            placeholder={'Tempat Lahir'}
            value={this.state.placebirth}
            onChangeText={(placebirth)=>this.setState({placebirth: placebirth})}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onRef={(ref) => { this.inputs['inputPlacebirth'] = ref }}
            onSubmitEditing={() => this.inputs['inputDatebirth'].focus()}
          />
          <CustomInput
            default
            label={'Tanggal Lahir'}
            placeholder={'Tanggal Lahir'}
            value={this.state.datebirth}
            onFocus={() => Keyboard.dismiss() || this.datePickerShow()}
            onChangeText={(datebirth)=>this.setState({datebirth: datebirth})}
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
              value={this.state.date}
              mode={'date'}
              display="calendar"
              onChange={(event, selectedDate) => this.tanggalLahir(event, selectedDate)}
            />
          }
          <CustomInput
            phone
            label={'No. Telp'}
            placeholder={'No. Telp'}
            value={this.state.phone}
            onChangeText={(phone)=>this.setState({phone: phone})}
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
                value={this.state.weight}
                onChangeText={(weight)=>this.setState({weight: weight})}
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
                value={this.state.height}
                onChangeText={(height)=>this.setState({height: height})}
                blurOnSubmit={false}
                returnKeyType={'done'}
                onRef={(ref) => { this.inputs['inputHeight'] = ref }}
                onSubmitEditing={() => null || Keyboard.dismiss()}
              />
            </>
          }
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => navigate('KeturunanSuku')}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}





class KeturunanSuku extends Component {
  constructor(props) {
    super(props);
    this.inputs= {}
    this.state = {
      async_role: '',
      keturunanSuku: '',
      keturunanSuku_Opt: mocks.form_KeturunanSuku.keturunanSuku,
      golonganDarah: '',
      golonganDarah_Opt: mocks.form_KeturunanSuku.golonganDarah,
      agama: '',
      agama_Opt: mocks.form_KeturunanSuku.agama,
      pendidikan: '',
      pendidikan_Opt: mocks.form_KeturunanSuku.pendidikan,
      statusPerkawinan: '',
      statusPerkawinan_Opt: mocks.form_KeturunanSuku.statusPerkawinan,
      lokasiTerkini: '',
      lokasiTerkini_Opt: mocks.form_KeturunanSuku.lokasiTerkini,
      jumlahAnak: '',
      jumlahAnak_Opt: mocks.form_KeturunanSuku.jumlahAnak
    };
  }

  async componentDidMount(){
    try{
      const async_role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: async_role})
      console.log(this.state.async_role)
    }catch(e){
      console.error(e)
    }
  }

  render(){
    const {navigate} = this.props.navigation
    const keturunanSuku_Opt = this.state.keturunanSuku_Opt
    const golonganDarah_Opt = this.state.golonganDarah_Opt
    const agama_Opt = this.state.agama_Opt
    const pendidikan_Opt = this.state.pendidikan_Opt
    const statusPerkawinan_Opt = this.state.statusPerkawinan_Opt
    const lokasiTerkini_Opt = this.state.lokasiTerkini_Opt
    const jumlahAnak_Opt = this.state.jumlahAnak_Opt
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
            selectedValue={this.state.keturunanSuku}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({keturunanSuku: itemValue}) //checkpoint here, statenya
            }>
            {keturunanSuku_Opt.map((sukuData) => (
              <Picker.Item key={sukuData.id} label={sukuData.title} value={sukuData.id}/>
            ))}
          </CustomPicker>
          {this.state.async_role == 'helper' &&
            <CustomPicker
              label={'Golongan Darah'}
              selectedValue={this.state.golonganDarah}
              style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
              onValueChange={(itemValue) =>
                this.setState({golonganDarah: itemValue}) //checkpoint here, statenya
              }>
              {golonganDarah_Opt.map((goldarData) => (
                <Picker.Item key={goldarData.id} label={goldarData.title} value={goldarData.id}/>
              ))}
            </CustomPicker>
          }
          <CustomPicker
            label={'Agama'}
            selectedValue={this.state.agama}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({agama: itemValue}) //checkpoint here, statenya
            }>
            {agama_Opt.map((agamaData) => (
              <Picker.Item key={agamaData.id} label={agamaData.title} value={agamaData.id}/>
            ))}
          </CustomPicker>
          {this.state.async_role == 'helper' &&
            <CustomPicker
              label={'Pendidikan'}
              selectedValue={this.state.pendidikan}
              style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
              onValueChange={(itemValue) =>
                this.setState({pendidikan: itemValue}) //checkpoint here, statenya
              }>
              {pendidikan_Opt.map((pendidikanData) => (
                <Picker.Item key={pendidikanData.id} label={pendidikanData.title} value={pendidikanData.id}/>
              ))}
            </CustomPicker>
          }
          <CustomPicker
            label={'Status Perkawinan'}
            selectedValue={this.state.statusPerkawinan}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({statusPerkawinan: itemValue}) //checkpoint here, statenya
            }>
            {statusPerkawinan_Opt.map((statusPerkawinanData) => (
              <Picker.Item key={statusPerkawinanData.id} label={statusPerkawinanData.title} value={statusPerkawinanData.id}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Lokasi Terkini'}
            selectedValue={this.state.lokasiTerkini}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({lokasiTerkini: itemValue}) //checkpoint here, statenya
            }>
            {lokasiTerkini_Opt.map((lokasiTerkiniData) => (
              <Picker.Item key={lokasiTerkiniData.id} label={lokasiTerkiniData.title} value={lokasiTerkiniData.id}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Jumlah Anak'}
            selectedValue={this.state.jumlahAnak}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({jumlahAnak: itemValue}) //checkpoint here, statenya
            }>
            {jumlahAnak_Opt.map((jumlahAnakData) => (
              <Picker.Item key={jumlahAnakData.id} label={jumlahAnakData.title} value={jumlahAnakData.id}/>
            ))}
          </CustomPicker>
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => navigate(this.state.async_role == 'helper' ? 'PengalamanKerja' : 'UploadKtp')}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}





class PengalamanKerja extends Component {
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
    };
  }

  async componentDidMount(){
    try {
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: role})
    } catch (e) {
      console.error(e)
    }
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
            value={this.state.gaji}
            onChangeText={(gaji)=>this.setState({gaji: gaji})}
            blurOnSubmit={false}
            returnKeyType={'next'}
            onSubmitEditing={(gaji)=>this.setState({gaji: gaji})}
          />
          <CustomPicker
            label={'Menginap (Live In)'}
            selectedValue={this.state.menginap}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({menginap: itemValue}) //checkpoint here, statenya
            }>
            {menginap_Opt.map((menginapData) => (
              <Picker.Item key={menginapData.id} label={menginapData.title} value={menginapData.id}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Ketakutan Terhadap Anjing'}
            selectedValue={this.state.takutAnjing}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({takutAnjing: itemValue}) //checkpoint here, statenya
            }>
            {takutAnjing_Opt.map((takutAnjingData) => (
              <Picker.Item key={takutAnjingData.id} label={takutAnjingData.title} value={takutAnjingData.id}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Pengalaman Kerja di Luar Negeri'}
            selectedValue={this.state.luarNegeri}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({luarNegeri: itemValue}) //checkpoint here, statenya
            }>
            {luarNegeri_Opt.map((luarNegeriData) => (
              <Picker.Item key={luarNegeriData.id} label={luarNegeriData.title} value={luarNegeriData.id}/>
            ))}
          </CustomPicker>
          <CustomPicker
            label={'Kemampuan Berbahasa Inggris'}
            selectedValue={this.state.bahasaInggris}
            style={{borderBottomColor: theme.colors.primary, borderBottomWidth: 2}}
            onValueChange={(itemValue) =>
              this.setState({bahasaInggris: itemValue}) //checkpoint here, statenya
            }>
            {bahasaInggris_Opt.map((bahasaInggrisData) => (
              <Picker.Item key={bahasaInggrisData.id} label={bahasaInggrisData.title} value={bahasaInggrisData.id}/>
            ))}
          </CustomPicker>
          <View marginTop={theme.sizes.base*1.5}>
            <Button color='primary' onPress={() => navigate('Penempatan')}>
              <Text white bold center>Lanjutkan</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}





class Penempatan extends Component {
  constructor(props) {
    super(props);
    this.inputs = {}
    this.state = {
      search: '',
      kota: mocks.form_Penempatan.kota
    };
  }

  async componentDidMount(){
    console.log(this.state.lokasi)
    // try {
      
    // } catch (e) {
    //   console.error(e)
    // }
  }

  kotaCheck=(id)=>{
    const kota = this.state.kota
    kota[id].checked = !kota[id].checked
    this.setState({kota: kota})
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
          />
        </View>
        <View flex={1} padding={[0, theme.sizes.base]}>
          <Text>Bersedia ditempatkan di :</Text>
          <View marginTop={theme.sizes.base}>
            <FlatList
              data={this.state.kota}
              renderItem={({item}) =>
                <CheckBox
                  style={{paddingVertical: theme.sizes.base*.25}}
                  onClick={() => this.kotaCheck(item.id)} 
                  isChecked={item.checked} 
                  checkBoxColor={theme.colors.primary}
                  uncheckedCheckBoxColor={theme.colors.black_t30}
                  rightText={<Text >{item.title}</Text>}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => navigate('Keterampilan')}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}





class Keterampilan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: mocks.form_Keterampilan.skill
    };
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
              data={this.state.skill}
              renderItem={({item}) =>
                <CheckBox
                  style={{paddingVertical: theme.sizes.base*.25}}
                  onClick={() => this.skillCheck(item.id)} 
                  isChecked={item.checked} 
                  checkBoxColor={theme.colors.primary}
                  uncheckedCheckBoxColor={theme.colors.black_t30}
                  rightText={<Text >{item.title}</Text>}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => navigate('UploadKtp')}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}





class UploadKtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '',
      ktpPlaceholder: 
      'https://lh3.googleusercontent.com/proxy/DJvQQ62TCjGmHE3iH2Gf74ANDDUIPIwvwEsVLjyVHsn6Xr72EVaHC68-acHzg1vWNvOBj9qB11McbSW1290'
    };
  }

  async componentDidMount(){
    try{
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: role})
    }catch(e){
      console.error(e)
    }
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
          <Button border={theme.colors.primary}>
            <Text primary bold center>Upload Photo</Text>
          </Button>
        </View>
        <View padding={theme.sizes.base}>
          <Button color='primary' onPress={() => navigate('UploadFotoProfil')}>
            <Text white bold center>Lanjutkan</Text>
          </Button>
        </View>
      </View>
    )
  }
}





class UploadFotoProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '',
      imgPlaceholder: 'https://source.unsplash.com/featured/?person',
      helperPlaceholder: mocks.form_UploadFotoProfil.helperPlaceholder
    };
  }

  async componentDidMount(){
    try{
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({async_role: role})
    }catch(e){
      console.error(e)
    }
  }

  simpanVerified(){
    Alert.alert(
      'Disimpan',
      'Terima kasih telah mengisi data, anda bisa melanjutkan ke halaman utama',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'Lanjutkan', onPress: () => this.props.navigation.navigate('Home')},
      ],
      {cancelable: false},
    )
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
                    source={{uri: this.state.imgPlaceholder}}
                  />
                </View>
                <View marginTop={theme.sizes.base*1.5}>
                  <Button border={theme.colors.primary}>
                    <Text primary bold center>Upload Photo</Text>
                  </Button>
                </View>
              </>
            :
              <FlatList
                data={this.state.helperPlaceholder}
                renderItem={({item}) => 
                  <View flex={1/3}>
                    <View padding={theme.sizes.base*.25}>
                      <Image
                        style={{
                          aspectRatio: 1,
                          backgroundColor: theme.colors.black_t90,
                          borderRadius: theme.sizes.base*.5,
                        }}
                        source={{uri: item.uri}}
                      />
                      <Button smallHeight border={theme.colors.primary} style={{marginTop: theme.sizes.base*.5}}>
                        <Text primary bold center>Pilih</Text>
                      </Button>
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
                    <Button border={theme.colors.primary}>
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
          <Button color='primary' onPress={() => this.simpanVerified()}>
            <Text white bold center>Simpan</Text>
          </Button>
        </View>
      </View>
    )
  }
}





export {
  Kategori,
  NamaLengkap,
  KeturunanSuku,
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
