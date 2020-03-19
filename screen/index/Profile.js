import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, FlatList, AsyncStorage, Dimensions } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash'

const menuList = [
  {id: 0, title: 'List Majikan', role: ['helper'], navigate: ''},
  {id: 1, title: 'Kontrak Kerja', role: ['helper'], navigate: 'KontrakKerja',  params: {navigateFrom: 'Profile', statusKontrak: 'Aktif'}},
  {id: 2, title: 'Kode Referal', role: ['helper', 'majikan'], navigate: ''},
  {id: 3, title: 'Settings', role: ['helper', 'majikan'], navigate: 'Settings'},
  {id: 4, title: 'Sign Out', role: ['helper', 'majikan'], navigate: ''},
]



class ProfilePlaceholder extends Component {
  render(){
    const {
      role,
      context
    } = this.props
    const {navigate} = context.props.navigation
    return(
      <View style={styles.parent}>
        <View style={{aspectRatio: 1036/872}} color={'red'}>
          <Image
            source={require('../../assets/img/png/undraw-access-account.png')}
            style={{
              flex: 1,
              aspectRatio: 1036/872
            }}
          />
        </View>
        <View padding={[0, theme.sizes.base, theme.sizes.base]}>
          <Text center>
            Silahkan Login sebagai
            {'\n'}
            <Text bold primary>
              {role == 'helper' ? 'Majikan' : 'Helper'}
            </Text>
            {'\n'}
            terlebih dahulu
          </Text>
        </View>
        <View padding={[0, theme.sizes.base]}>
          <Button color='primary' onPress={() => navigate('Login')}>
            <View>
              <Text white bold center>Sign Out</Text>
            </View>
          </Button>
        </View>
      </View>
    )
  }
}


class ProfileContent extends Component {
  render() {
    const {
      role,
      context
    } = this.props
    const list = _.filter(menuList, {role: [role]})
    const {navigate} = context.props.navigation
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
            <Text title ellipsizeMode={'tail'} numberOfLines={1}>{role}</Text>
            <Text caption italic ellipsizeMode={'tail'} numberOfLines={1}>Not Verified</Text>
            <View marginTop={theme.sizes.base*.5}>
              <Button smallHeight color={'primary'} onPress={() => navigate('ViewData', {title: 'Detail ' + role})}>
                <View>
                  <Text white bold center >View Data</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
        <View padding={[theme.sizes.base, theme.sizes.base, 0]}>
          <Touch>
            <View row center space={'between'} style={styles.border} padding={theme.sizes.base}>
              <View>
                <Text caption>Jumlah Poin</Text>
                <Text title>1440</Text>
              </View>
              <Text primary bold>View</Text>
            </View>
          </Touch>
        </View>
        {role == 'majikan' &&
          <View padding={[theme.sizes.base, theme.sizes.base, 0]}>
            <Touch>
              <View row center style={styles.border} padding={theme.sizes.base}>
                <View flex={1}>
                  <Text >Ingin menjadi mitra HelperQ?</Text>
                </View>
                <View flex={1}>
                  <Text right primary bold>More Info</Text>
                </View>
              </View>
            </Touch>
          </View>
        }
        <View margin={[theme.sizes.base, 0]}>
          <FlatList
            data={list}
            renderItem={({item}) => 
              <Touch onPress={() => navigate(item.navigate, item.params)}>
                <View row color={'white'} padding={theme.sizes.base}>
                  <View flex={1} paddingLeft={theme.sizes.base*.5}>
                    <Text>{item.title}</Text>
                  </View>
                  {item.title=='Sign Out' ?
                    null
                  :
                    <Icon name={'chevron-right'} size={24} />
                  }
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

class ProfileHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: ''
    };
  }

  async componentDidMount(){
    console.disableYellowBox = true
    // const list  = _.filter(menuList, {role: ['majikan']})
    // console.log(list)
    try {
      // await AsyncStorage.setItem('ASYNC_ROLE', 'majikan')
      const role =  await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({'async_role': role})
      // this.render()
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    return (
    this.state.async_role == 'helper' ?
      <ProfileContent context={this} role={this.state.async_role}>
      </ProfileContent>
    :
      <ProfilePlaceholder context={this} role={this.state.async_role}>
      </ProfilePlaceholder>
    )
  }
}

class ProfileMajikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: ''
    };
  }

  async componentDidMount(){
    console.disableYellowBox = true
    // const list  = _.filter(menuList, {role: ['majikan']})
    // console.log(list)
    try {
      // await AsyncStorage.setItem('ASYNC_ROLE', 'helper')
      const role =  await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({'async_role': role})
      this.render()
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
    this.state.async_role == 'majikan' ?
      <ProfileContent context={this} role={this.state.async_role} navigateFrom={'ProfileMajikan'}>
      </ProfileContent>
    :
      <ProfilePlaceholder context={this} role={this.state.async_role}>
      </ProfilePlaceholder>
    )
  }
}


export {ProfileMajikan, ProfileHelper, ProfileContent}

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
