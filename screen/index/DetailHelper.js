import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  AsyncStorage,
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
import Base from '../../Utils/Base'
import moment from 'moment'

const dummy = mocks.detailHelperMocks;

class Separator extends Base {
  render() {
    return <View color={theme.colors.black_t90} height={1}></View>;
  }
}

class HeadContent extends Base {
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
            {this.props.data.helper_sub_category.name}
          </Text>
          <Text white caption>
            Gaji : Rp. {this.props.data.requested_price}
          </Text>
        </View>
        <View padding={theme.sizes.base * 1.5} center>
          <Text h3 ellipsizeMode={"tail"} numberOfLines={1}>
            {this.props.data.name}
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

class DetailProfil extends Base {
  constructor(props) {
    super(props)
    this.state = {}
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
      { title: "Nama Lengkap", value: this.props.data.name },
      { title: "Email", value: this.props.data.email },
      { title: "Jenis Kelamin", value: this.props.data.gender == 1 ? 'Laki - Laki' : 'Perempuan' },
      { title: "Tempat Lahir", value: this.props.data.birth_place.name },
      { title: "Tanggal Lahir", value: moment(this.props.data.birth_date).format('DD MMM YYYY') },
      { title: "No.Telp", value: this.props.data.phone == null ? '-' : this.props.data.phone },
      { title: "Alamat", value: this.props.data.address == null ? '-' : this.props.data.address },
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

class DetailDetail extends Base {
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
      { title: "Gaji per Bulan", value: "Rp. " + this.props.data.requested_price },
      { title: "Biaya administrasi", value: "Rp. " + dummy.detail.biayaAdmin },
      { title: "Menginap", value: this.props.data.could_live_in ? 'Ya' : 'Tidak' },
      { title: "Takut anjing", value: this.props.data.is_afraid_dog ? 'Ya' : 'Tidak' },
      { title: "Pengalaman kerja luar negeri", value: this.props.data.have_work_abroad ? 'Ya' : 'Tidak' },
      { title: "Mengerti Bahasa Inggris", value: this.props.data.is_understood_english ? 'Ya' : 'Tidak' },
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
          data={this.props.data.work_at}
          renderItem={({ item, index }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {index + 1 + ". " + item.city.name}
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

class Keterampilan extends Base {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"keterampilan kerja"} leftIcon={"accessible"}>
        <FlatList
          data={this.props.data_skill}
          renderItem={({ item, index }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {index + 1 + ". " + item.skill.name}
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

class RiwayatPekerjaan extends Base {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"riwayat pekerjaan"} leftIcon={"work"}>
        <FlatList
          data={this.props.data_job_history}
          renderItem={({ item }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {"- " + item.name + ' (' + item.from_year + ' - ' + item.to_year + ')'}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View height={theme.sizes.base / 2} />}
        />
      </Collapse>
    );
  }
}

class RiwayatKesehatan extends Base {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Collapse title={"riwayat kesehatan"} leftIcon={"healing"}>
        <FlatList
          data={this.props.data_health_history}
          renderItem={({ item }) => (
            <Text lilbit bold style={{ flex: 1 }}>
              {"- " + item.name}
            </Text>
          )}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View height={theme.sizes.base / 2} />}
        />
      </Collapse>
    );
  }
}

class Review extends Base {
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
          <Text bold>{item.user.name}</Text>
          <Text caption>{moment(item.createdAt).format('DD MMM YYYY')}</Text>
        </View>
        <View wrap pointerEvents="none" marginBottom={theme.sizes.base / 2}>
          <AirbnbRating
            size={theme.sizes.lilbit}
            isDisabled={true}
            showRating={false}
            defaultRating={item.rating}
            count={5}
          />
        </View>
        <Text lilbit>{item.review}</Text>
      </View>
    );
  };

  render() {
    return (
      <Collapse title={"review & ratings"} leftIcon={"email"}>
        <FlatList
          data={this.props.data_rating}
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

class DetailContact extends Base {
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

export default class DetailHelper extends Base {
  state = {
    token : '',
    data_helper : {helper_sub_category : {name : ''}, birth_place : {name : ''}},
    user_type : '',
  }

  static navigationOptions = {
    title: "Detail Helper",
  };

  async componentDidMount(){
    var token = await AsyncStorage.getItem('token')
    var user_type = await AsyncStorage.getItem('user_type')
    await this.setState({token : token, user_type : user_type})

    await this.get_data()
  }

  async get_data(){
    try{
      var response = await this.axios.get(this.url + '/user?id='+this.props.navigation.state.params.id, {
          headers:{
          'Content-Type': 'application/json',
          'Authorization' : this.state.token
          }
      })
  
      if(response.data.status == 'success'){
          var data = response.data.data
          
          data.verified_at_format = data.verified_at == null ? '-' : moment(data.verified_at).format('DD MMM YYYY')

          var photo_list = data.photo_list
          
          // for(var x in photo_list){
          //   photo_list[x].image_display = {uri : this.url + '/images/user?file_name=' + photo_list[x].file_name}
          // }

          // await AsyncStorage.setItem('dataHelperDetail', JSON.stringify(data))
          await this.setState({data_helper : data})
      }
    }
    catch(e){
        Snackbar.show({
            text: e,
            duration: Snackbar.LENGTH_SHORT,
        })
    }
  }

  async alert() {
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
        { text: "OK", onPress: () => this.toCheckout() },
      ],
      { cancelable: false }
    );
  }

  async toCheckout(){
    await AsyncStorage.setItem('helperData', JSON.stringify(this.state.data_helper))
    this.props.navigation.navigate("CheckOut")
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
          <HeadContent data={this.state.data_helper} />
          <DetailContact data={this.state.data_helper} />
        </ScrollView>
        <this.bottomButton
          onPress={() => dispatch(toOrder)}
          title={"BACK TO HOME"}
        />
      </View>
    ) : (
      <View style={styles.parent}>
        <ScrollView style={styles.parent}>
          <HeadContent data={this.state.data_helper} />
          <DetailProfil data={this.state.data_helper} />
          <DetailDetail data={this.state.data_helper} />
          <Keterampilan data_skill={this.state.data_helper.skill} />
          <RiwayatPekerjaan data_job_history={this.state.data_helper.job_history} />
          <RiwayatKesehatan data_health_history={this.state.data_helper.health_history} />
          <Review data_rating={this.state.data_helper.rating} />
        </ScrollView>
        {
          this.state.user_type == 'Helper' || this.state.user_type == '' ? <></> : 
          <this.bottomButton
            onPress={() => this.alert()}
            title={"REKRUT SEKARANG"}
          />
        }
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