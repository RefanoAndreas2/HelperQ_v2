import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'

const helper = {
  keterampilan : [
    {id: 0, title: 'Change Password', navigate: 'ChangePassword'},
    {id: 1, title: 'Privacy Policy', navigate: 'PrivacyPolicy'},
    {id: 1, title: 'Terms and Condition', navigate: 'TermsAndCondition'},
  ]
}

export default class ViewDokumen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '' 
    };
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Settings',
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
    const {navigate} = this.props.navigation
    return (
      <View style={styles.parent}>
        <FlatList
          data={helper.keterampilan}
          renderItem={({item, index}) =>
            <Touch onPress={() => navigate(item.navigate)}>
              <View key={item.id} padding={theme.sizes.base} center row space={'between'}>
                <Text>{item.title}</Text>
                <Icon name={'chevron-right'} size={theme.sizes.base*1.5}/>
              </View>
            </Touch>
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View height={1} color={theme.colors.black_t90}/>}
        />
      </View>
    )
  }
}

const styles = GlobalStyle
