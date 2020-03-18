import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, FlatList, AsyncStorage, Dimensions, Alert } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash'

const helper = [
  {id: 0, title: 'List Foto', navigate: ''},
  {id: 1, title: 'View Profile', navigate: 'ViewProfile'},
  {id: 2, title: 'View General Info', navigate: 'ViewGeneral'},
  {id: 3, title: 'Keterampilan Kerja', navigate: 'ViewKeterampilan'},
  {id: 4, title: 'Riwayat Kesehatan', navigate: 'ViewRiwayatKesehatan'},
  {id: 5, title: 'Riwayat Pekerjaan', navigate: 'ViewRiwayatPekerjaan'},
  {id: 6, title: 'Dokumen', navigate: 'ViewDokumen'},
]

const majikan = [
  {id: 0, title: 'View Profile', navigate: 'ViewProfile'},
  {id: 1, title: 'Dokumen', navigate: 'ViewDokumen'},
]


export default class ViewData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '',
      verified: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  });

  async componentDidMount(){
    try {
      await AsyncStorage.setItem('ASYNC_ROLE', 'helper')
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({'async_role': role})
    } catch (e) {
      console.error(e)
    }
  }

  topButton(role, verified){
    console.log(verified)
    role == 'majikan' ?
      this.props.navigation.navigate('Home')
    :
    verified ?
      this.props.navigation.navigate('Home')
    :
      Alert.alert(
        'Verfikasi',
        'Lanjutkan ke proses verifikasi?',
        [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
          {text: 'Lanjutkan', onPress: () => this.props.navigation.navigate('Verifikasi')},
        ],
        {cancelable: false},
      )
  }
  
  render() {
    const {navigate} = this.props.navigation
    return (
      <ScrollView style={styles.parent}>
        <View row padding={[theme.sizes.base, theme.sizes.base, 0]}>
          <View>
            <Image
              source={{uri: 'https://source.unsplash.com/random'}}
              style={{
                flex: 1,
                aspectRatio: 1,
                borderRadius: theme.sizes.base*.5}}
            />
            <AirbnbRating showRating={false} size={theme.sizes.base*.5} isDisabled={true} defaultRating={5}/>
          </View>
          <View flex={1} marginLeft={theme.sizes.base}>
            <Text title ellipsizeMode={'tail'} numberOfLines={1}>Nama</Text>
            <Text caption italic ellipsizeMode={'tail'} numberOfLines={1}>Not Verified</Text>
            <View marginTop={theme.sizes.base*.5}>
              <Button smallHeight color={'primary'} onPress={() => this.topButton(this.state.async_role, this.state.verified)}>
                <View>
                  <Text white bold center >
                    {this.state.async_role=='helper' ? this.state.verified ? 'Lihat Order Verifikasi':'Verifikasi Akun' : 'Ganti Foto'}
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>

        <View margin={[theme.sizes.base, 0]}>
          <FlatList
            data={this.state.async_role == 'helper' ? helper : majikan}
            renderItem={({item}) => 
              <Touch onPress={() => navigate(item.navigate)}>
                <View row color={'white'} padding={theme.sizes.base}>
                  <View flex={1} paddingLeft={theme.sizes.base*.5}>
                    <Text>{item.title}</Text>
                  </View>
                  <Icon name={'chevron-right'} size={24} />
                </View>
              </Touch>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View height={1} margin={[0, theme.sizes.base]} color={theme.colors.black_t90} />}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = GlobalStyle
