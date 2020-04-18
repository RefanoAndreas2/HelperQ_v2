import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, FlatList, AsyncStorage, Dimensions, Alert } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch, Badge } from '../../components'
import { theme, mocks } from '../../constants';
import { AirbnbRating } from 'react-native-ratings';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash'

export default class ListMajikan extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "List Majikan",
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

  item(){
    return(
      <View radius={theme.sizes.base/2} color={'white'} shadow ovHidden margin={[0, theme.sizes.base]}>
        <Touch onPress={() => null}>
          <View row padding={theme.sizes.base*.5}>
            <View>
              <Image
                source={{uri: 'https://source.unsplash.com/random'}}
                style={{
                  width: theme.sizes.base*6,
                  aspectRatio: 1,
                  borderRadius: theme.sizes.base*.5
                }}
              />
            </View>
            <View flex={1} marginLeft={theme.sizes.base/2}>
              <View wrap>
                {/* <Badge status={this.props.item.helper.is_working ? 'Aktif' : 'NonAktif'}>
                  {this.props.item.helper.is_working ? 'Aktif' : 'NonAktif'}
                </Badge> */}
                <Badge status={'Aktif'}>
                  Aktif
                </Badge>
              </View>
              <Text ellipsizeMode={'tail'} upbit bold numberOfLines={1}>[Nama]</Text>
              <View row center marginTop={theme.sizes.base/4}>
                <MDIcon name={'place'} size={theme.sizes.base} />
                <Text caption>[Lokasi]</Text>
              </View>
              <Text caption>[Date]</Text>
            </View>
          </View>
        </Touch>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.parent}>
        <ScrollView stickyHeaderIndices={[0]} onScroll={this._onScroll}>
          <View padding={theme.sizes.base} center color={theme.colors.bgParent} row space={'between'}>
            <Text lilbit >Total 10  Calon Helper</Text>
            <Button smallHeight color={'secondary'}>
              <View row center padding={theme.sizes.base*.5}>
                <Text white lilbit style={{marginHorizontal: theme.sizes.base*.5}}>Paling Baru</Text>
                <MDIcon name={'arrow-drop-down'} size={24} color={'white'}/>
              </View>
            </Button>
          </View>
          <this.item />
          {/* <FlatList
            data={this.state.data_arr}
            renderItem={({item}) => 
              <ListKontrakItem item={item} navigation={this.props.navigation} />
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            ListFooterComponent={() => <Separator />}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = GlobalStyle
