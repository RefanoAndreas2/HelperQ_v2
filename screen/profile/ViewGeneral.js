import React, { Component } from 'react'
import { StyleSheet, FlatList, AsyncStorage, ScrollView} from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';

const helper = {
  informasi :  [
    {id: 0, title: 'Kategori Pekerjaan', desc: '-'},
    {id: 1, title: 'Pengalaman Kerja', desc: '0 tahun'},
    {id: 2, title: 'Gaji Per Bulan', desc: 'Rp. x.xxx.xxx'},
    {id: 3, title: 'Menginap (Live in)', desc: 'Ya/Tidak'},
    {id: 4, title: 'Takut anjing', desc: 'Ya/Tidak'},
    {id: 5, title: 'Pengalaman kerja LN', desc: 'Ya/Tidak'},
    {id: 6, title: 'Berbahasa Inggris', desc: 'Ya/Tidak'},
  ],
  lainnya : [
    {id: 0, title: 'Jabodetabek', desc: '-'},
    {id: 1, title: 'Bandung', desc: '-'},
    {id: 2, title: 'Yogyakarta', desc: '-'},
  ]
}

export default class ViewGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      async_role: '' 
    };
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'General Info',
    headerRight: (
      <Button color='primary' onPress={() => navigation.navigate('Home')}>
        <View padding={[0, theme.sizes.base]}>
          <Text white bold>Edit</Text>
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
      <ScrollView style={styles.parent}>
        <View padding={theme.sizes.base}>
          <Text bold>Informasi</Text>
        </View>
        <View padding={theme.sizes.base}>
          <FlatList
            data={helper.informasi}
            renderItem={({item}) =>
              <View key={item.id} center row space={'between'}>
                <Text>{item.title}</Text>
                <Text lilbit>{item.desc}</Text>
              </View>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View height={theme.sizes.base}/>}
          />
        </View>
        <View padding={theme.sizes.base}>
          <Text bold>Bersedia bekerja di</Text>
        </View>
        <View padding={theme.sizes.base}>
          <FlatList
            data={helper.lainnya}
            renderItem={({item, index}) =>
              <View key={item.id} center row space={'between'}>
                <Text>{index+1}. {item.title}</Text>
              </View>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View height={theme.sizes.base}/>}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = GlobalStyle
