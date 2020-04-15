import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

const helper = {
  keterampilan : [
    {id: 0, title: 'Merapikan Rumah', desc: '-'},
    {id: 1, title: 'Memasak', desc: '-'},
    {id: 2, title: 'Mencuci manual', desc: '-'},
  ]
}

export default class ViewKeterampilan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '' 
    };
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: "Keterampilan",
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
      <ScrollView style={styles.parent}>
        <View row center space={"between"} padding={theme.sizes.base}>
          <Text style={{ marginLeft: theme.sizes.base / 2 }}>Total 5 Keterampilan</Text>
          <Button smallHeight color="secondary">
            <Text
              caption
              white
              style={{ paddingHorizontal: theme.sizes.base }}
            >
              Edit
            </Text>
          </Button>
        </View>
        <FlatList
          data={helper.keterampilan}
          renderItem={({item, index}) =>
            <View key={index} row color={'white'} shadow padding={theme.sizes.base} margin={[0, theme.sizes.base]} key={item.id} center row>
              <Icon name={'radio-button-checked'} size={theme.sizes.base*1.5} color={theme.colors.secondary} />
              <Text style={{marginLeft: theme.sizes.base}}>{item.title}</Text>
            </View>
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View height={theme.sizes.base}/>}
          ListFooterComponent={() => <View height={theme.sizes.base} />}
        />
      </ScrollView>
    )
  }
}

const styles = GlobalStyle
