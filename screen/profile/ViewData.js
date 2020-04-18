import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, FlatList, AsyncStorage, Dimensions, Alert } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash'

const helper = [
  {id: 0, icon: 'lock', title: 'List Foto', navigate: 'ListFoto'},
  {id: 1, icon: 'lock', title: 'View Profile', navigate: 'ViewProfile'},
  {id: 2, icon: 'lock', title: 'View General Info', navigate: 'ViewGeneral'},
  {id: 3, icon: 'lock', title: 'Keterampilan Kerja', navigate: 'ViewKeterampilan'},
  {id: 4, icon: 'lock', title: 'Riwayat Kesehatan', navigate: 'ViewRiwayatKesehatan'},
  {id: 5, icon: 'lock', title: 'Riwayat Pekerjaan', navigate: 'ViewRiwayatPekerjaan'},
  {id: 6, icon: 'lock', title: 'Dokumen', navigate: 'ViewDokumen'},
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
    title: "Dokumen Pribadi",
    headerStyle: {
      backgroundColor: "white",
      color: theme.colors.primary,
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    headerTintColor: theme.colors.primary,
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
      <View style={styles.parent}>
        <ScrollView style={styles.parent}>
          <View center padding={theme.sizes.base}>
            <Image
              source={{ uri: "https://source.unsplash.com/random" }}
              style={{
                width: theme.sizes.base * 6,
                aspectRatio: 1,
                borderRadius: theme.sizes.base * 6,
                marginBottom: theme.sizes.base
              }}
            />
            <AirbnbRating
              showRating={false}
              size={theme.sizes.base}
              isDisabled={true}
              defaultRating={5}
            />
            <Text title ellipsizeMode={"tail"} numberOfLines={1}>
              Bambang Gunawan
            </Text>
            <Text lilbit italic ellipsizeMode={"tail"} numberOfLines={1}>
              Not Verified | Status : Publish
            </Text>
          </View>

          <View margin={[theme.sizes.base, 0]}>
            <FlatList
              data={this.state.async_role == 'helper' ? helper : majikan}
              renderItem={({ item }) => (
                <View shadow color={'white'}>
                  <Touch onPress={() => navigate(item.navigate, item.params)}>
                    <View row padding={theme.sizes.base}>
                      <Icon name={item.icon} size={24} color={theme.colors.primary}/>
                      <View flex={1} paddingLeft={theme.sizes.base * 0.5}>
                        <Text color={item.title == 'Sign Out' ? theme.colors.secondary : 'black'}>{item.title}</Text>
                      </View>
                      {item.title == "Sign Out" ? null : (
                        <Icon name={"arrow-drop-down"} size={24} style={{transform:[{rotate: '-90deg'}]}} />
                      )}
                    </View>
                  </Touch>
                </View>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <View
                  height={theme.sizes.base}
                />
              )}
              ListFooterComponent={<View height={3} />}
            />
          </View>
        </ScrollView>
        <View padding={theme.sizes.base} color={'white'} style={{elevation: 6}}>
          <Button
            color={'secondary'}
            onPress={() => this.topButton(this.state.async_role, this.state.verified)}
          >
            <Text white center style={{marginHorizontal: theme.sizes.base}}>
              {this.state.async_role=='helper' ? this.state.verified ? 'Lihat Order Verifikasi':'Verifikasi Akun' : 'Ganti Foto'}
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = GlobalStyle
