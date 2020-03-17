import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Dimensions, FlatList, Alert, TouchableWithoutFeedback} from 'react-native'
import { Text, View, GlobalStyle, Badge, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { AirbnbRating, Rating } from 'react-native-ratings';
import SwiperFlatList from 'react-native-swiper-flatlist';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

import { StackActions, NavigationActions } from 'react-navigation';

const dummy = mocks.detailHelperMocks

class Separator extends Component {
  render(){
    return(
      <View color={theme.colors.black_t90} height={1}>
      </View>
    )
  }
}

class HeadContent extends Component{
  render(){
    return(
      <View>
        <SwiperFlatList
          data={dummy.photo}
          autoplay
          autoplayLoop
          renderItem={({item}) => 
            <Image
              source={{uri: item.uri}}
              style={{
                width: Dimensions.get('window').width,
                aspectRatio: 16/9}}
            />
          }
          keyExtractor={item => item.id}
          pagingEnabled
        />
        <View padding={theme.sizes.base}>
          <View wrap marginBottom={theme.sizes.base*.5}>
            <Badge>
              {dummy.kategori}
            </Badge>
          </View>
          <Text h1>{dummy.nama}</Text>
          <Text>Gaji : Rp. {dummy.gaji}</Text>
          <View wrap marginTop={theme.sizes.base*.5}>
            <Rating imageSize={theme.sizes.base} readonly startingValue={dummy.rating}/>
          </View>
        </View>
      </View>
    )
  }
}
function Arrow({context}) {
  return(
    context.state.isCollapsed ? 
      <MDIcon name={'arrow-drop-down'} size={24}/>
    :
      <MDIcon name={'arrow-drop-up'} size={24}/>
  )
}

class DetailProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  item = ({title, value}) =>{
    return(
      <View row margin={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{title}</Text>
        <Text right style={{flex: 1}}>{value}</Text>
      </View>
    )
  }

  

  render(){
    const list = [
      {title: 'Lokasi saat ini', value: dummy.profile.lokasi},
      {title: 'Umur', value: dummy.profile.umur},
      {title: 'Berat', value: dummy.profile.berat},
      {title: 'Tinggi', value: dummy.profile.tinggi},
      {title: 'Pendidikan', value: dummy.profile.pendidikan},
      {title: 'Status perkawinan', value: dummy.profile.statusPerkawinan},
      {title: 'Keturunan Suku', value: dummy.profile.keturunanSuku},
      {title: 'Golongan darah', value: dummy.profile.golonganDarah},
      {title: 'Agama', value: dummy.profile.agama},
      {title: 'Jumlah anak', value: dummy.profile.jumlahAnak},
    ]
    return(
      <View>
        <Touch onPress={() => this.setState({isCollapsed: !this.state.isCollapsed})}>
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text title>Profil</Text>
            <Arrow context={this} />
          </View>
        </Touch>
        <Collapsible collapsed={this.state.isCollapsed} collapsedHeight={0.1} enablePointerEvents>
          <View>
            <Separator />
            <View padding={theme.sizes.base}>
              <FlatList
                data={list}
                renderItem={({item}) =>
                  <this.item title={item.title} value={item.value}/>
                }
                scrollEnabled={false}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    )
  }
}

class DetailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }
  item = ({title, value}) =>{
    return(
      <View row margin={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{title}</Text>
        <Text right style={{flex: 1}}>{value}</Text>
      </View>
    )
  }

  penempatan = ({title, index}) =>{
    return(
      <View row margin={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{index + '. ' + title}</Text>
      </View>
    )
  }
  render(){
    const list = [
      {title: 'Pengalaman Kerja', value: dummy.detail.pengalaman + ' tahun'},
      {title: 'Gaji per Bulan', value: 'Rp. ' + dummy.detail.gaji},
      {title: 'Biaya administrasi', value: 'Rp. ' + dummy.detail.biayaAdmin},
      {title: 'Menginap', value: dummy.detail.menginap},
      {title: 'Takut anjing', value: dummy.detail.takutAnjing},
      {title: 'Pengalaman kerja luar negeri', value: dummy.detail.luarNegeri},
      {title: 'Mengerti Bahasa Inggris', value: dummy.detail.bahasaInggris},
    ]
    return(
      <View>
        <Touch onPress={() => this.setState({isCollapsed: !this.state.isCollapsed})}>
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text title>Detail</Text>
            <Arrow context={this} />
          </View>
        </Touch>
        <Collapsible collapsed={this.state.isCollapsed} collapsedHeight={0.1} enablePointerEvents>
          <View>
            <Separator />
            <View padding={theme.sizes.base}>
              <FlatList
                data={list}
                renderItem={({item}) =>
                  <this.item title={item.title} value={item.value == true && 'Ya' || item. value == false && 'Tidak' || item.value }/>
                }
                scrollEnabled={false}
              />
              <View row margin={[theme.sizes.base*.5, 0]}>
                <Text style={{flex: 1}}>Bersedia Bekerja di :</Text>
              </View>
              <FlatList
                data={dummy.detail.penempatan}
                renderItem={({item, index}) =>
                  <this.penempatan title={item.title} index={index + 1}/>
                }
                scrollEnabled={false}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    )
  }
}

class Keterampilan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  item = ({title, index}) =>{
    return(
      <View row margin={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{index + '. ' + title}</Text>
      </View>
    )
  }

  render(){
    return(
      <View>
        <Touch onPress={() => this.setState({isCollapsed: !this.state.isCollapsed})}>
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text title>Keterampilan Kerja</Text>
            <Arrow context={this} />
          </View>
        </Touch>
        <Collapsible collapsed={this.state.isCollapsed} collapsedHeight={0.1} enablePointerEvents>
          <View>
            <Separator />
            <View padding={theme.sizes.base}>
              <View row margin={[theme.sizes.base*.5, 0]}>
                <Text style={{flex: 1}}>Keterampilan</Text>
              </View>
              <FlatList
                data={dummy.keterampilan}
                renderItem={({item, index}) =>
                  <this.item title={item.title} index={index + 1}/>
                }
                scrollEnabled={false}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    )
  }
}

class RiwayatPekerjaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  item = ({title}) =>{
    return(
      <View row margin={[theme.sizes.base*.5, 0]}>
        <Text style={{flex: 1}}>{'- ' + title}</Text>
      </View>
    )
  }

  render(){
    return(
      <View>
        <Touch onPress={() => this.setState({isCollapsed: !this.state.isCollapsed})}>
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text title>Riwayat Pekerjaan</Text>
            <Arrow context={this} />
          </View>
        </Touch>
        <Collapsible collapsed={this.state.isCollapsed} collapsedHeight={0.1} enablePointerEvents>
          <View>
            <Separator />
            <View padding={theme.sizes.base}>
              <FlatList
                data={dummy.riwayatPekerjaan}
                renderItem={({item}) =>
                  <this.item title={item.title}/>
                }
                scrollEnabled={false}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    )
  }
}

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  item = ({item}) =>{
    return(
      <View margin={[theme.sizes.base*.5, 0]}>
        <View padding={theme.sizes.base} style={styles.border}>
          <View row space={'between'}>
            <Text bold>{item.majikan}</Text>
            <Text caption>{item.tanggal}</Text>
          </View>
          {/* <TouchableWithoutFeedback onPress={() => console.log('texst')}> */}
            <View wrap margin={[theme.sizes.base*.5, 0]} pointerEvents='none'>
              <AirbnbRating size={theme.sizes.base} isDisabled={true} showRating={false} defaultRating={item.rating}/>
            </View>
          {/* </TouchableWithoutFeedback> */}
          <Text>{item.desc}</Text>
        </View>
      </View>
    )
  }

  render(){
    return(
      <View>
        <Touch onPress={() => this.setState({isCollapsed: !this.state.isCollapsed})}>
          <View row center space={'between'} padding={theme.sizes.base}>
            <Text title>Review & Ratings</Text>
            <Arrow context={this} />
          </View>
        </Touch>
        <Collapsible collapsed={this.state.isCollapsed} collapsedHeight={0.1} enablePointerEvents>
          <View>
            <Separator />
            <View padding={theme.sizes.base}>
              <FlatList
                data={dummy.review}
                renderItem={({item}) =>
                  <this.item item={item}/>
                }
                scrollEnabled={false}
              />
            </View>
          </View>
        </Collapsible>
      </View>
    )
  }
}

class DetailContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <View>
        <Separator />
        <View row padding={theme.sizes.base}>
          <View flex={1} >
            <View center>
              <View radius={theme.sizes.base*2} ovHidden marginBottom={theme.sizes.base*.5}>
                <Touch onPress={() => null} ripple={theme.colors.whatsapp}>
                  <View width={theme.sizes.base*3.5} thick={2} ratio={1} middle center color={'white'} border={theme.colors.whatsapp} radius={theme.sizes.base*2}>
                    <FAIcon name={'whatsapp'} size={24} color={theme.colors.whatsapp}/>
                  </View>
                </Touch>
              </View>
              <Text small bold>Whatsapp</Text>
            </View>
          </View>
          <View flex={1}>
            <View center>
              <View radius={theme.sizes.base*2} ovHidden marginBottom={theme.sizes.base*.5}>
                <Touch onPress={() => null} ripple={theme.colors.primary}>
                  <View width={theme.sizes.base*3.5} thick={2} ratio={1} middle center color={'white'} border={theme.colors.primary} radius={theme.sizes.base*2}>
                    <FAIcon name={'sms'} size={24} color={theme.colors.primary}/>
                  </View>
                </Touch>
              </View>
              <Text small bold>SMS</Text>
            </View>
          </View>
          <View flex={1}>
            <View center>
              <View radius={theme.sizes.base*2} ovHidden marginBottom={theme.sizes.base*.5}>
                <Touch onPress={() => null} ripple={theme.colors.primary}>
                  <View width={theme.sizes.base*3.5} thick={2} ratio={1} middle center color={'white'} border={theme.colors.primary} radius={theme.sizes.base*2}>
                    <FAIcon name={'phone'} size={24} color={theme.colors.primary}/>
                  </View>
                </Touch>
              </View>
              <Text small bold>Phone</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default class DetailHelper extends Component {
  static navigationOptions = {
    title: 'Detail Helper'
  }

  alert(){
    const {navigate} = this.props.navigation
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin merekrut helper ini?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigate('CheckOut')},
      ],
      {cancelable: false},
    );
  }

  bottomButton = ({title ,onPress}) => {
    return(
      <View padding={theme.sizes.base}>
        <Button color='primary' onPress={onPress}>
          <Text white center bold>{title}</Text>
        </Button>
      </View>
    )
  }

  content() {
    const {navigation} = this.props
    const {navigate, dispatch} = navigation
    const navigateFrom = navigation.getParam('navigateFrom')
    const toOrder = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'indexBottomTab' }),
      ],
    });
    return (
      navigateFrom == 'PaymentGateway' ?
        <View style={styles.parent}>
          <ScrollView style={styles.parent}>
            <HeadContent />
            <DetailContact />
          </ScrollView>
          <this.bottomButton onPress={() => dispatch(toOrder)} title={'Back To Home'}/>
        </View>
      : 
        <View style={styles.parent}>
          <ScrollView style={styles.parent}>
            <HeadContent />
            <DetailContact />
            <Separator />
            <DetailProfil />
            <Separator />
            <DetailDetail />
            <Separator />
            <Keterampilan />
            <Separator />
            <RiwayatPekerjaan />
            <Separator />
            <Review />
          </ScrollView>
          <this.bottomButton onPress={() => this.alert()} title={'Rekrut Sekarang'}/>
          {/* <View padding={theme.sizes.base}>
            <Button color='primary' onPress={() => this.alert()}>
              <Text white center bold>Rekrut Sekarang</Text>
            </Button>
          </View> */}
        </View>
    )
  }
  
  render() {
    const {navigation} = this.props
    const navigateFrom = navigation.getParam('navigateFrom')

    return this.content()
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white'
  },
  listTouch: {
    marginHorizontal: theme.sizes.base,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90
  }
})