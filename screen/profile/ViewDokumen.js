import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

const helper = {
  keterampilan : [
    {id: 0, title: 'KTP', desc: '-'},
    {id: 1, title: 'KTP 1', desc: '-'},
  ]
}

export default class ViewDokumen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '' 
    };
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: "Dokumen",
    headerStyle: {
      backgroundColor: 'white',
      color: theme.colors.primary
    },
    headerTitleStyle: {
      color: theme.colors.primary,
      fontWeight: 'bold'
    },
    headerTintColor: theme.colors.primary
  });

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
      <View>
        <View padding={theme.sizes.base}>
          <Text>Total 1 Dokumen</Text>
        </View>
        <FlatList
          data={helper.keterampilan}
          renderItem={({item, index}) =>
            <View row color={'white'} shadow center padding={theme.sizes.base} space={'between'}>
              <Text color={item.title == 'Sign Out' ? theme.colors.secondary : 'black'}>{item.title}</Text>
              <Icon name={"arrow-drop-down"} size={24} style={{transform:[{rotate: '-90deg'}]}} />
            </View>
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View height={theme.sizes.base} />}
          ListFooterComponent={() => <View height={theme.sizes.base} />}
          // style={{marginTop: theme.sizes.base}}
        />
      </View>
    )
  }
}

const styles = GlobalStyle
