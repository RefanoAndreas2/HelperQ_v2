
import React, { Component } from 'react'
import { StyleSheet, LayoutAnimation, ScrollView, Image, FlatList } from 'react-native'
import { Text, View, GlobalStyle, Button, CustomInput, Touch, Badge } from '../../components'
import { theme, mocks } from '../../constants';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ActionButton from 'react-native-action-button';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash'

function Separator(){
  return(
    <View padding={theme.sizes.base/2}/>
  )
}

function ListHelperItem({item, context}){
  const {navigate} = context.props.navigation
  return(
    <View ovHidden shadow radius={theme.sizes.base/2} margin={[0, theme.sizes.base]}>
      <Touch onPress={() => navigate('KontrakKerja', {navigateFrom: 'OrderListHelper'})}>
        <View color={'white'} >
          <View row padding={theme.sizes.base*.5}>
            <View>
              <Image
                source={{uri: 'https://source.unsplash.com/random'}}
                style={{
                  width: theme.sizes.base*6,
                  aspectRatio: 1,
                  borderRadius: theme.sizes.base*.5}}
              />
            </View>
            <View flex={1} marginLeft={theme.sizes.base/2}>
              <View wrap>
                <AirbnbRating showRating={false} size={theme.sizes.base*.75} isDisabled={true} defaultRating={item.rating} count={5}/>
              </View>
              <Text ellipsizeMode={'tail'} upbit bold numberOfLines={1}>{item.nama}</Text>
              <Text caption >{item.pekerjaan}</Text>
              <View row center marginTop={theme.sizes.base/4}>
                <MDIcon name={'place'} size={theme.sizes.lilbit} style={{marginRight: theme.sizes.base/4}} />
                <Text caption>{item.lokasi}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touch>
    </View>
  )
}

function ListKontrakItem({item, context}){
  const {navigate} = context.props.navigation
  return(
    <View radius={theme.sizes.base/2} color={'white'} shadow ovHidden margin={[0, theme.sizes.base]}>
      <Touch onPress={() => navigate('KontrakKerja', {navigateFrom: 'OrderKontrakKerja', statusKontrak: item.statusKontrak})}>
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
              <Badge status={item.statusKontrak}>
                {item.statusKontrak}
              </Badge>
            </View>
            <Text ellipsizeMode={'tail'} upbit bold numberOfLines={1}>{item.nama}</Text>
            <Text caption>{item.pekerjaan}</Text>
            <View row center marginTop={theme.sizes.base/4}>
              <MDIcon name={'place'} size={theme.sizes.base} />
              <Text caption>{item.lokasi}</Text>
            </View>
          </View>
        </View>
      </Touch>
    </View>
  )
}

class OrderListHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const listHelper = _.filter(this.state.list, {tipe: 'list'})
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
          <FlatList
            data={listHelper}
            renderItem={({item}) => 
              <ListHelperItem item={item} context={this}/>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            ListFooterComponent={() => <Separator />}
          />
        </ScrollView>
        {/* {this.state.isActionButtonVisible ? 
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => <FAIcon name={'whatsapp'} size={24} color={'white'}/>}
            buttonColor={theme.colors.whatsapp}
            onPress={() => { console.log("hi")}}
          />
        : null} */}
      </View>
    )
  }
}

class OrderKontrakKerja extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const listHelper = _.filter(this.state.list, {tipe: 'list'})
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
          <FlatList
            data={listHelper}
            renderItem={({item}) => 
              <ListKontrakItem item={item} context={this}/>
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            ListFooterComponent={() => <Separator />}
          />
        </ScrollView>
        {/* {this.state.isActionButtonVisible ? 
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => <FAIcon name={'whatsapp'} size={24} color={'white'}/>}
            buttonColor={theme.colors.whatsapp}
            onPress={() => { console.log("hi")}}
          />
        : null} */}
      </View>
    )
  }
}

export {OrderListHelper, OrderKontrakKerja}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.colors.bgParent
  },
  listTouch: {
    marginHorizontal: theme.sizes.base,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90
  }
})
