import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  AsyncStorage,
  Dimensions,
  Alert,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Button,
  CustomInput,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";

const listFotoData = [
  { primary: true },
  { primary: false },
  { primary: false },
  { primary: false },
  { primary: false },
];

export default class ListFoto extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    title: "List Foto",
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

  componentDidMount() {}

  render() {
    return (
      <View style={styles.parent}>
        <FlatList
          data={[...listFotoData, {addImage: true}]}
          renderItem={({ item , index}) => (
            item.addImage ? 
            <View flex={1 / 3}>
              <View padding={theme.sizes.base/2}>
                <View radius={theme.sizes.base/2} ovHidden >
                  <Touch onPress={() => null}>
                    <View ratio={1} radius={theme.sizes.base/2} center middle style={{borderWidth: 2, borderColor: theme.colors.black_t90, borderStyle: 'dashed'}}>
                      <Icon name={'add-circle'} size={theme.sizes.base*3} color={theme.colors.black_t60}/>
                    </View>
                  </Touch>
                </View>
              </View>
            </View>
            :
            <View flex={1 / 3}>
              <View padding={theme.sizes.base/2}>
                <Image
                  style={{
                    aspectRatio: 1,
                    backgroundColor: theme.colors.black_t90,
                    borderRadius: theme.sizes.base * 0.5,
                  }}
                />
                <View marginTop={theme.sizes.base/2}>
                  {item.primary ? 
                  <Button
                    smallHeight
                    color={'transparent'}
                  >
                    <Text caption center>
                      Primary
                    </Text>
                  </Button>
                  :
                  <Button
                    smallHeight
                    color={'primary'}
                  >
                    <Text caption white center>
                      Set Primary
                    </Text>
                  </Button>
                  }
                </View>
                <View
                  radius={theme.sizes.base}
                  color={theme.colors.danger}
                  ovHidden
                  position={"absolute"}
                  style={{
                    right: theme.sizes.base * 0.25,
                    top: theme.sizes.base * 0.25,
                  }}
                >
                  <Touch>
                    <Icon
                      name={"close"}
                      color={theme.colors.white}
                      size={theme.sizes.base}
                    />
                  </Touch>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          style={{ marginTop: theme.sizes.base * 0.5, paddingHorizontal: theme.sizes.base/2}}
        />
        <View
          color={"white"}
          padding={theme.sizes.base}
          style={{ elevation: 6 }}
        >
          <Button color={"secondary"}>
            <Text center white>
              SIMPAN
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = GlobalStyle;
