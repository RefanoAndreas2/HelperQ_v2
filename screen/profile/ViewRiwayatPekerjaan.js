import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

const helper = {
  keterampilan : [
    {id: 0, title: 'ART 2010-2011', desc: '-'},
    {id: 1, title: 'ART 2009-2010', desc: '-'},
  ]
}

export default class ViewRiwayatPekerjaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '' 
    };
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Riwayat Pekerjaan',
    headerRight: (
      <Button color='primary' onPress={() => navigation.navigate('Home')}>
        <View padding={[0, theme.sizes.base]}>
          <Icon name={'add'} size={theme.sizes.base*1.5} color={'white'}/>
        </View>
      </Button>
    ),
  })

  async componentDidMount(){
    try {
      await AsyncStorage.setItem('ASYNC_ROLE', 'helper')
      const role = await AsyncStorage.getItem('ASYNC_ROLE')
      this.setState({'async_role': role})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <FlatList
        data={helper.keterampilan}
        renderItem={({item, index}) =>
          <Touch>
            <View key={item.id} padding={theme.sizes.base} center row space={'between'}>
              <Text>{item.title}</Text>
              <Icon name={'chevron-right'} size={theme.sizes.base*1.5}/>
            </View>
          </Touch>
        }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View height={1} color={theme.colors.black_t90}/>}
      />
    )
  }
}

const styles = GlobalStyle
