import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, Image, FlatList, Dimensions, ScrollView, LayoutAnimation, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch } from '../../components'
import { theme, mocks } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SwiperFlatList from 'react-native-swiper-flatlist';
import { AirbnbRating } from 'react-native-ratings';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

function List({item, context}) {
  return(
    <View style={styles.listTouch}>
      <Touch onPress={() => context.props.navigation.navigate('DetailHelper')}>
        <View color={'white'} style={styles.border}>
          <View row padding={theme.sizes.base*.5}>
            <View>
              <View flex={1}>
                <Image
                  source={{uri: 'https://source.unsplash.com/random'}}
                  style={{
                    flex: 1,
                    borderRadius: theme.sizes.base*.5}}
                />
              </View>
              <AirbnbRating showRating={false} size={theme.sizes.base*.75} isDisabled={true} defaultRating={5}/>
            </View>
            <View flex={1} marginLeft={theme.sizes.base}>
              <View wrap>
                <View padding={[theme.sizes.base*.25, theme.sizes.base*.5]} color={theme.colors.primary_light} radius={theme.sizes.base*.25}>
                  <Text small white bold>Gaji : Rp. {item.gaji}</Text>
                </View>
              </View>
              <View margin={[theme.sizes.base*.25, 0]}>
                <Text ellipsizeMode={'tail'} bold numberOfLines={1}>{item.nama}</Text>
              </View>
              <Text caption>Pekerjaan: {item.pekerjaan}</Text>
              <Text caption>Asal Daerah : {item.asal}</Text>
              <Text caption>Lokasi : {item.lokasi}</Text>
              <Text caption>{item.pendidikan}</Text>
              <View marginTop={theme.sizes.base*.25}>
                <Text caption italic primary>{item.status ? 'Sedang Bekerja' : 'Belum Bekerja'}</Text>
              </View>
            </View>
          </View>
          <View height={1} color={theme.colors.black_t90}></View>
          <View row>
            <View padding={theme.sizes.base*.5} flex={1}>
              <Text caption center italic>{item.umur} Tahun</Text>
            </View>
            <View width={1} color={theme.colors.black_t90}></View>
            <View padding={theme.sizes.base*.5} flex={1}>
              <Text caption center italic>{item.pengalaman} thn pengalaman</Text>
            </View>
          </View>
        </View>
      </Touch>
    </View>
  )
}

function Ads({item}) {
  return(
    <View margin={[0, theme.sizes.base]} shadow color='white'>
      <Touch>
        <Image source={{uri: item.uri}} style={{aspectRatio: 3/1}}/>
      </Touch>
    </View>
  )
}

function Separator(){
  return(
    <View padding={theme.sizes.base/2}/>
  )
}

class AllList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: mocks.helperList.banner,
      list: mocks.helperList.list,
      isActionButtonVisible: true
    };
  }

  _listViewOffset = 0

  _onScroll = (event) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    // Update your scroll position
    this._listViewOffset = currentOffset
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.parent}>
        <ScrollView onScroll={this._onScroll}>
          <View padding={theme.sizes.base}>
            <SwiperFlatList
              data={this.state.banner}
              autoplay
              autoplayLoop
              renderItem={({item}) => 
                <Image
                  source={{uri: item.uri}}
                  style={{
                    width: Dimensions.get('window').width-theme.sizes.base*2, 
                    aspectRatio: 16/9,
                    borderRadius: theme.sizes.base*.5}}
                />
              }
              keyExtractor={item => item.id}
              pagingEnabled
            />
          </View>
          <FlatList
            data={this.state.list}
            renderItem={({item}) => 
              item.tipe == 'list' ?
              <List item={item} context={this}/>
              :
              <Ads item={item}/>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            style={{paddingBottom: theme.sizes.base}}
          />
        </ScrollView>
        {this.state.isActionButtonVisible ? 
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => <Icon name={'whatsapp'} size={24} color={'white'}/>}
            buttonColor={theme.colors.whatsapp}
            onPress={() => { console.log("hi")}}
          />
        : null}
      </View>
    )
  }
}

class Verified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: mocks.helperList.banner,
      list: mocks.helperList.list
    };
  }

  _onScroll = (event) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    // Update your scroll position
    this._listViewOffset = currentOffset
  }

  render() {
    return (
      <View style={styles.parent}>
        <ScrollView onScroll={this._onScroll}>
          <FlatList
            data={this.state.list}
            renderItem={({item}) => 
              item.tipe == 'list' ?
              <List item={item}/>
              :
              <Ads item={item}/>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            style={{paddingVertical: theme.sizes.base}}
          />
        </ScrollView>
        {this.state.isActionButtonVisible ? 
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => <Icon name={'whatsapp'} size={24} color={'white'}/>}
            buttonColor={theme.colors.whatsapp}
            onPress={() => { console.log("hi")}}
          />
        : null}
      </View>
    )
  }
}

export {AllList, Verified}

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
