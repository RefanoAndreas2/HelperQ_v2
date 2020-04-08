import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Badge,
  Button,
  CustomInput,
  Collapse,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import { AirbnbRating, Rating } from "react-native-ratings";
import SwiperFlatList from "react-native-swiper-flatlist";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import Collapsible from "react-native-collapsible";

import { StackActions, NavigationActions } from "react-navigation";
import Animated, { Easing } from "react-native-reanimated";

const dummy = mocks.detailHelperMocks;

class Separator extends Component {
  render() {
    return <View color={theme.colors.black_t90} height={1}></View>;
  }
}

class HeadContent extends Component {
  render() {
    return (
      <View>
        <SwiperFlatList
          data={dummy.photo}
          autoplay
          autoplayLoop
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{
                width: Dimensions.get("window").width,
                aspectRatio: 3 / 2,
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          pagingEnabled
        />
        <View
          color={"primary"}
          padding={theme.sizes.base}
          row
          space={"between"}
        >
          <Text white caption>
            {dummy.kategori}
          </Text>
          <Text white caption>
            Gaji : Rp. {dummy.gaji}
          </Text>
        </View>
        <View padding={theme.sizes.base * 1.5} center>
          <Text h3 ellipsizeMode={"tail"} numberOfLines={1}>
            Bambang Gunawan
          </Text>
          <AirbnbRating
            showRating={false}
            size={theme.sizes.base}
            isDisabled={true}
            defaultRating={5}
            selectedColor={"black"}
          />
        </View>
      </View>
    );
  }
}

function Arrow({ context }) {
  return context.state.isCollapsed ? (
    <MDIcon name={"arrow-drop-down"} size={24} />
  ) : (
    <MDIcon name={"arrow-drop-up"} size={24} />
  );
}

class DetailProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  item = ({ title, value }) => {
    return (
      <View row>
        <Text lilbit style={{ flex: 1 }}>
          {title}
        </Text>
        <View width={theme.sizes.lilbit} />
        <Text lilbit bold style={{ flex: 1 }}>
          {value}
        </Text>
      </View>
    );
  };

  render() {
    const list = [
      { title: "Nama Lengkap", value: "[Nama]" },
      { title: "Email", value: "[Email]" },
      { title: "Jenis Kelamin", value: "[Jenis]" },
      { title: "Tempat Lahir", value: "[Tempat]" },
      { title: "Tanggal Lahir", value: "[Tanggal]" },
      { title: "No.Telp", value: "[Telp]" },
      { title: "Alamat", value: "[Alamat]" },
    ];
    return (
      <Collapse title={"Profile"} leftIcon={"face"}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <this.item title={item.title} value={item.value} />
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
        />
      </Collapse>
    );
  }
}

class DetailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  item = ({ title, value }) => {
    return (
      <View row>
        <Text lilbit style={{ flex: 1 }}>
          {title}
        </Text>
        <View width={theme.sizes.base} />
        <Text lilbit bold style={{ flex: 1 }}>
          {value}
        </Text>
      </View>
    );
  };

  render() {
    const list = [
      { title: "Pengalaman Kerja", value: dummy.detail.pengalaman + " tahun" },
      { title: "Gaji per Bulan", value: "Rp. " + dummy.detail.gaji },
      { title: "Biaya administrasi", value: "Rp. " + dummy.detail.biayaAdmin },
      { title: "Menginap", value: dummy.detail.menginap },
      { title: "Takut anjing", value: dummy.detail.takutAnjing },
      { title: "Pengalaman kerja luar negeri", value: dummy.detail.luarNegeri },
      { title: "Mengerti Bahasa Inggris", value: dummy.detail.bahasaInggris },
    ];
    return (
      <Collapse title={"detail"} leftIcon={"assignment"}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <this.item
              title={item.title}
              value={
                (item.value == true && "Ya") ||
                (item.value == false && "Tidak") ||
                item.value
              }
            />
          )}
          ItemSeparatorComponent={() => <View height={theme.sizes.lilbit} />}
          scrollEnabled={false}
        />
        <View row margin={[theme.sizes.lilbit, 0]}>
          <Text lilbit style={{ flex: 1 }}>
            Bersedia Bekerja di :
          </Text>
        </View>
        <FlatList
          data={dummy.detail.penempatan}
          renderItem={({ item, index }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {index + 1 + ". " + item.title}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View height={theme.sizes.lilbit / 2} />
          )}
        />
      </Collapse>
    );
  }
}

class Keterampilan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"keterampilan kerja"} leftIcon={"accessible"}>
        <FlatList
          data={dummy.keterampilan}
          renderItem={({ item, index }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {index + 1 + ". " + item.title}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View height={theme.sizes.lilbit / 3} />
          )}
        />
      </Collapse>
    );
  }
}

class RiwayatPekerjaan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"riwayat pekerjaan"} leftIcon={"work"}>
        <FlatList
          data={dummy.riwayatPekerjaan}
          renderItem={({ item }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {"- " + item.title}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View height={theme.sizes.base / 2} />}
        />
      </Collapse>
    );
  }
}

class RiwayatKesehatan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"riwayat kesehatan"} leftIcon={"healing"}>
        <FlatList
          data={dummy.riwayatPekerjaan}
          renderItem={({ item }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {"- " + item.title}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View height={theme.sizes.base / 2} />}
        />
      </Collapse>
    );
  }
}

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  item = ({ item }) => {
    return (
      <View>
        <View row space={"between"}>
          <Text bold>{item.majikan}</Text>
          <Text caption>{item.tanggal}</Text>
        </View>
        <View wrap pointerEvents="none" marginBottom={theme.sizes.base / 2}>
          <AirbnbRating
            size={theme.sizes.lilbit}
            isDisabled={true}
            showRating={false}
            defaultRating={item.rating}
          />
        </View>
        <Text lilbit>{item.desc}</Text>
      </View>
    );
  };

  render() {
    return (
      <Collapse title={"review & ratings"} leftIcon={"email"}>
        <FlatList
          data={dummy.review}
          renderItem={({ item }) => <this.item item={item} />}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View padding={[theme.sizes.base, 0]}>
              <View height={1} backgroundColor={theme.colors.black_t90} />
            </View>
          )}
        />
      </Collapse>
    );
  }
}

class DetailContact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  button = ({ icon, children, onPress }) => {
    return (
      <View radius={theme.sizes.base * 2} ovHidden color={"white"} shadow>
        <Touch onPress={onPress}>
          <View
            width={theme.sizes.base * 3.5}
            ratio={1}
            middle
            center
            radius={theme.sizes.base * 2}
          >
            {children}
          </View>
        </Touch>
      </View>
    );
  };

  render() {
    return (
      <View>
        <View row padding={theme.sizes.base} space={"between"}>
          <this.button onPress={() => console.log("Texst")}>
            <MDIcon name={"phone"} size={theme.sizes.base * 1.5} />
          </this.button>
          <this.button>
            <MDIcon name={"message"} size={theme.sizes.base * 1.5} />
          </this.button>
          <this.button>
            <FAIcon name={"whatsapp"} size={theme.sizes.base * 1.5} />
          </this.button>
        </View>
      </View>
    );
  }
}

export default class DetailHelper extends Component {
  static navigationOptions = {
    title: "Detail Helper",
  };

  alert() {
    const { navigate } = this.props.navigation;
    Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin merekrut helper ini?",
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigate("CheckOut") },
      ],
      { cancelable: false }
    );
  }

  bottomButton = ({ title, onPress }) => {
    return (
      <View
        padding={theme.sizes.base}
        color={'white'}
        style={{ elevation: 6 }}
      >
        <Button color="secondary" onPress={onPress}>
          <Text white center>
            {title}
          </Text>
        </Button>
      </View>
    );
  };

  content() {
    const { navigation } = this.props;
    const { navigate, dispatch } = navigation;
    const navigateFrom = navigation.getParam("navigateFrom");
    const toOrder = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "indexBottomTab" })],
    });
    return navigateFrom == "PaymentGateway" ? (
      <View style={styles.parent}>
        <ScrollView style={styles.parent}>
          <HeadContent />
          <DetailContact />
        </ScrollView>
        <this.bottomButton
          onPress={() => dispatch(toOrder)}
          title={"BACK TO HOME"}
        />
      </View>
    ) : (
      <View style={styles.parent}>
        <ScrollView style={styles.parent}>
          <HeadContent />
          <DetailProfil />
          <DetailDetail />
          <Keterampilan />
          <RiwayatPekerjaan />
          <RiwayatKesehatan />
          <Review />
        </ScrollView>
        <this.bottomButton
          onPress={() => this.alert()}
          title={"REKRUT SEKARANG"}
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const navigateFrom = navigation.getParam("navigateFrom");

    return this.content();
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: theme.colors.bgParent,
  },
  listTouch: {
    marginHorizontal: theme.sizes.base,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.black_t90,
  },
});
