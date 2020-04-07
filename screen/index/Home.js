import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View as RnView,
  StatusBar,
  StatusBarIOS,
  TextInput
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Button,
  CustomInput,
  Touch,
  Badge
} from "../../components";
import { theme, mocks } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SwiperFlatList from "react-native-swiper-flatlist";
import { AirbnbRating } from "react-native-ratings";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SegmentedControls } from "react-native-radio-buttons";
import Animated, { Extrapolate } from "react-native-reanimated";

function List({ item, context }) {
  return (
    <View
      style={styles.listTouch}
      radius={theme.sizes.base * 0.5}
      shadow
      ovHidden
    >
      <Touch onPress={() => context.props.navigation.navigate("DetailHelper")}>
        <View color={"white"}>
          <View row padding={theme.sizes.base * 0.5}>
            <View style={{ aspectRatio: 1 / 1.375 }} space={"between"}>
              <Image
                source={{ uri: "https://source.unsplash.com/random/?people" }}
                style={{
                  aspectRatio: 1 / 1,
                  borderRadius: theme.sizes.base * 0.5
                }}
              />
              <Badge>{item.status ? "Sedang Bekerja" : "Belum Bekerja"}</Badge>
            </View>
            <View flex={1} marginLeft={theme.sizes.base * 0.75}>
              <View wrap>
                <AirbnbRating
                  showRating={false}
                  size={theme.sizes.base*.75}
                  isDisabled={true}
                  defaultRating={5}
                />
              </View>
              <View margin={[0]}>
                <Text ellipsizeMode={"tail"} upbit bold numberOfLines={1}>
                  {item.nama}
                </Text>
              </View>
              <Text lilbit>
                {item.pekerjaan} | Rp. {item.gaji}
              </Text>
              <View row center marginTop={theme.sizes.base/4}>
                <Icon name={"place"} size={theme.sizes.lilbit} style={{marginRight: theme.sizes.base/4}} />
                <Text caption>Asal Daerah : {item.asal}</Text>
              </View>
              <View row center marginTop={theme.sizes.base/4}>
                <Icon name={"place"} size={theme.sizes.lilbit} style={{marginRight: theme.sizes.base/4}} />
                <Text caption>Asal Daerah : {item.asal}</Text>
              </View>
              <View row center marginTop={theme.sizes.base/4}>
                <Icon name={"place"} size={theme.sizes.lilbit} style={{marginRight: theme.sizes.base/4}} />
                <Text caption>Asal Daerah : {item.asal}</Text>
              </View>
              {/* <Text caption>Asal Daerah : {item.asal}</Text>
              <Text caption>Lokasi : {item.lokasi}</Text>
              <Text caption>{item.pendidikan}</Text> */}
            </View>
          </View>

        </View>
      </Touch>
    </View>
  );
}

function Ads({ item }) {
  return (
    <View margin={[0, theme.sizes.base]} shadow color="white" radius={theme.sizes.base/2} ovHidden>
      <Touch>
        <Image source={{ uri: item.uri }} style={{ aspectRatio: 3 / 1 }} />
      </Touch>
    </View>
  );
}

function Separator() {
  return <View padding={theme.sizes.base / 2} />;
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

  _listViewOffset = 0;

  _onScroll = event => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 0 && currentOffset > this._listViewOffset ? "down" : "up";
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === "up";
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({ isActionButtonVisible });
    }
    // Update your scroll position
    this._listViewOffset = currentOffset;
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.parent}>
        <ScrollView onScroll={this._onScroll}>
          <View padding={theme.sizes.base}>
            <SwiperFlatList
              data={this.state.banner}
              autoplay
              autoplayLoop
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width:
                      Dimensions.get("window").width - theme.sizes.base * 2,
                    aspectRatio: 16 / 9,
                    borderRadius: theme.sizes.base * 0.5
                  }}
                />
              )}
              keyExtractor={item => item.id}
              pagingEnabled
            />
          </View>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) =>
              item.tipe == "list" ? (
                <List item={item} context={this} />
              ) : (
                <Ads item={item} />
              )
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            style={{ paddingBottom: theme.sizes.base }}
          />
        </ScrollView>
        {this.state.isActionButtonVisible ? (
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => (
              <Icon name={"whatsapp"} size={24} color={"white"} />
            )}
            buttonColor={theme.colors.whatsapp}
            onPress={() => {
              console.log("hi");
            }}
          />
        ) : null}
      </View>
    );
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

  _onScroll = event => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 0 && currentOffset > this._listViewOffset ? "down" : "up";
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === "up";
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({ isActionButtonVisible });
    }
    // Update your scroll position
    this._listViewOffset = currentOffset;
  };

  render() {
    return (
      <View style={styles.parent}>
        <ScrollView onScroll={this._onScroll}>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) =>
              item.tipe == "list" ? <List item={item} /> : <Ads item={item} />
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            style={{ paddingVertical: theme.sizes.base }}
          />
        </ScrollView>
        {this.state.isActionButtonVisible ? (
          <ActionButton
            offsetX={theme.sizes.base}
            offsetY={theme.sizes.base}
            renderIcon={() => (
              <Icon name={"whatsapp"} size={24} color={"white"} />
            )}
            buttonColor={theme.colors.whatsapp}
            onPress={() => {
              console.log("hi");
            }}
          />
        ) : null}
      </View>
    );
  }
}

const options = ["All Helpers", "Verified"];
const HEADER_HEIGHT = theme.sizes.base * 3.7 - 2 + StatusBar.currentHeight;
const c =
  (Dimensions.get("window").width / 16) * 6 + StatusBar.currentHeight * 1.5;
const scrollY = new Animated.Value(0);
const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = Animated.interpolate(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT]
});
const paddingY = Animated.interpolate(diffClampScrollY, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [HEADER_HEIGHT / 2 + theme.sizes.base - 3, -HEADER_HEIGHT]
  // extrapolateRight: Extrapolate.CLAMP
});
const bgC = Animated.color(
  62,
  121,
  189,
  Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  })
);

class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: mocks.helperList.banner,
      list: mocks.helperList.list
    };
  }

  render() {
    return (
      <View style={styles.parent}>

        {/* NAVBAR_START */}
        <Animated.View style={styles.animated_navbar}>
          <View flex={1} row middle center>
            <Icon
              name={"place"}
              size={theme.sizes.base * 1.5}
              color={"white"}
            />
            <Text bold white title>
              REWANG
            </Text>
          </View>
          <View
            absolute
            middle
            style={{
              bottom: 0,
              top: StatusBar.currentHeight,
              right: theme.sizes.base / 2
            }}
          >
            <View radius={theme.sizes.base * 1.5} ovHidden>
              <Touch>
                <Icon
                  name={"notifications"}
                  size={theme.sizes.base * 1.5}
                  color={"white"}
                  style={{ margin: theme.sizes.base / 2 }}
                />
              </Touch>
            </View>
          </View>
        </Animated.View>
        {/* NAVBAR_END */}


        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={0}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } }
            }
          ])}
          onScrollBeginDrag={() => console.log}
          style={{ paddingTop: paddingY }}
          stickyHeaderIndices={[1]}
        >
          <SwiperFlatList
            data={this.state.banner}
            autoplay
            autoplayLoop
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: Dimensions.get("window").width,
                  aspectRatio: 16 / 9
                }}
              />
            )}
            keyExtractor={item => item.id}
            pagingEnabled
            style={{
              marginTop: StatusBar.currentHeight - 3
            }}
          />

          {/* SECBAR_START */}
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1000,
              marginTop: c
            }}
          >
            {/* SECBAR_COLOR_START */}
            <Animated.View
              style={{
                backgroundColor: bgC,
                paddingTop: StatusBar.currentHeight
              }}
            >
              <View
                row
                center
                color={"white"}
                radius={theme.sizes.base / 2}
                margin={[0, theme.sizes.base]}
                padding={[theme.sizes.base * 0.75, theme.sizes.base]}
                shadow
              >
                <Icon
                  name={"search"}
                  size={theme.sizes.base * 1.5}
                  color={theme.colors.black_t90}
                />
                <TextInput
                  placeholder={'Search'}
                  style={{
                    fontSize: theme.sizes.base,
                    marginLeft: theme.sizes.base
                  }}
                />
              </View>
              <View margin={theme.sizes.base}>
                <SegmentedControls
                  options={options}
                  tint={theme.colors.primary_dark}
                  separatorWidth={0}
                  selectedOption={options[0]}
                  optionStyle={styles.segmented_optionStyle}
                  optionContainerStyle={styles.segmented_optionContainerStyle}
                  containerStyle={styles.segmented_containerStyle}
                />
              </View>
            </Animated.View>
            {/* SECBAR_COLOR_END */}
          </Animated.View>
          {/* SECBAR_END */}

          <FlatList
            data={this.state.list}
            renderItem={({ item }) =>
              item.tipe == "list" ? (
                <List item={item} context={this} />
              ) : (
                <Ads item={item} />
              )
            }
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            scrollEnabled={false}
            style={{ paddingBottom: theme.sizes.base, marginTop: theme.sizes.base*7 }}
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

export { AllList, Verified, MainHome };

const styles = StyleSheet.create({
  animated_navbar: {
    flexDirection: "row",
    position: "absolute",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.primary,
    top: 0,
    height: HEADER_HEIGHT,
    right: 0,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
    transform: [{ translateY: headerY }]
  },
  segmented_optionStyle: {
    fontSize: theme.sizes.base,
    fontWeight: "bold",
    margin: theme.sizes.base * 0.5
  },
  segmented_optionContainerStyle: {
    borderRadius: theme.sizes.base * 0.5,
    padding: 0
  },
  segmented_containerStyle: {
    borderWidth: 0,
    borderRadius: theme.sizes.base * 0.5,
    elevation: 2
  },
  parent: {
    flex: 1,
    backgroundColor: theme.colors.bgParent
  },
  listTouch: {
    marginHorizontal: theme.sizes.base
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90
  },
  searchBar: {
    position: "absolute",
    // marginTop: mTSearch,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    padding: theme.sizes.base
  }
});
