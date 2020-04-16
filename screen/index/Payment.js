import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  AsyncStorage,
} from "react-native";
import {
  Text,
  View,
  GlobalStyle,
  Badge,
  Button,
  CustomInput,
  Touch,
} from "../../components";
import { theme, mocks } from "../../constants";
import { RadioButtons, SegmentedControls } from "react-native-radio-buttons";
import Icon from "react-native-vector-icons/MaterialIcons";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { StackActions, NavigationActions } from "react-navigation";
import Base from '../../Utils/Base'

class Payment extends Base {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      token : '',
      method_arr : [],
      total_price : 0,
    };
  }

  async componentDidMount(){
    var token = await AsyncStorage.getItem('token')
    await this.setState({token : token, total_price : this.props.navigation.state.params.total_price})

    await this.get_data()
  }

  async get_data(){
    try{
      var response = await this.axios.get(this.url + '/payment-method', {
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : this.state.token
          }
      })
      if(response.data.status == 'success'){
          var data = response.data.data.data
          for(var x in data){
              data[x].label = data[x].name
              data[x].value = data[x].id
          }
          await this.setState({method_arr : data})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  async toPaymentGateway(){
    var data_helper = await AsyncStorage.getItem('helperData')
    data_helper = JSON.parse(data_helper)
    
    var data = {}
    data.helper = data_helper
    data.payment_method = this.state.selectedOption
    
    try{
      var response = await this.axios.post(this.url + '/order-interested', data, {
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : this.state.token
          }
      })
      if(response.data.status == 'success'){
        this.props.navigation.navigate("PaymentGateway")
      }
    }
    catch(e){
        console.log(e)
    }
  }

  render() {
    const options = [
      "OVO", "CREDIT CARD", "POIN"];

    function setSelectedOption(selectedOption) {
      this.setState({
        selectedOption,
      });
    }

    function renderOption(option, selected, onSelect, index) {
      const radio = selected ? (
        <Icon
          name={"radio-button-checked"}
          size={24}
          color={theme.colors.primary}
        />
      ) : (
        <Icon
          name={"radio-button-unchecked"}
          size={24}
          color={theme.colors.black_t60}
        />
      );
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View
            row
            center
            padding={[theme.sizes.base]}
            style={{ flexDirection: "row-reverse" }}
          >
            {radio}
            <Text left style={{ flex: 1 }}>
              {option.name}
            </Text>
            <Image
              source={require("../../assets/img/png/undraw-access-account.png")}
              style={{
                width: theme.sizes.base*2,
                aspectRatio: 1,
                marginRight: theme.sizes.base
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View marginTop={theme.sizes.base/2}>{optionNodes}</View>;
    }

    const { navigate } = this.props.navigation;

    return (
      <View flex={1} style={styles.parent}>
        <ScrollView style={{ flex: 1 }}>
          <View
            color={"white"}
            margin={[theme.sizes.base, theme.sizes.base, theme.sizes.base / 2]}
            radius={theme.sizes.base / 2}
            shadow
            padding={theme.sizes.base}
          >
            <Text>Total Tagihan</Text>
            <Text h3 secondary style={{ marginTop: theme.sizes.base / 2 }}>
              Rp. {this.state.total_price}
            </Text>
          </View>
          <View
            row
            center
            color={"white"}
            radius={theme.sizes.base / 2}
            shadow
            margin={[0, theme.sizes.base, theme.sizes.base]}
            padding={theme.sizes.base}
          >
            <Icon name={"euro-symbol"} size={theme.sizes.base * 2} />
            <Text style={{ flex: 1, marginLeft: theme.sizes.base }}>Poin</Text>
            <Text bold secondary h3>
              1.000 Poin
            </Text>
          </View>
          <View padding={[0, theme.sizes.base]}>
            <Text bold>Metode Pembayaran</Text>
          </View>
          <RadioButtons
            options={this.state.method_arr}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
        </ScrollView>
        <View padding={theme.sizes.base} color={'white'} style={{elevation: 6}}>
          <Button color='secondary' onPress={() => this.toPaymentGateway()}>
            <Text white center>
              PROSES
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class CheckOut extends Base {
  state = {
    token : '',
    price_data : [],
    total_price : 0,
  }

  async componentDidMount(){
    var token = await AsyncStorage.getItem('token')
    await this.setState({token : token})

    await this.get_data('interested')
  }

  async get_data(type){
    try{
      var arr = this.state.price_data

      var response = await this.axios.get(this.url + '/setting-price?type='+type, {
          headers:{
          'Content-Type': 'application/json',
          'Authorization' : this.state.token
          }
      })
  
      if(response.data.status == 'success'){
          var data = response.data.data
          data.title = type == 'interested' ? 'Perekrutan Helper x1' : type == 'tax' ? 'Pajak' : ''
          arr.push(data)

          var total = this.state.total_price
          total += data.price

          await this.setState({price_data : arr, total_price : total})
      }
    }
    catch(e){
        console.log(e)
    }
  }

  item = (item) => {
    return (
      <View row>
        <Text lilbit bold style={{ flex: 1 }}>
          {item.title}
        </Text>
        <Text lilbit primary right style={{ flex: 1 }}>
          Rp. {item.price}
        </Text>
      </View>
    );
  };

  itemFooter = () => {
    return (
      <View>
        <View
          height={1}
          margin={[theme.sizes.lilbit, 0]}
          color={theme.colors.black_t90}
        />
        <View row>
          <Text lilbit bold style={{ flex: 1 }}>
            Total
          </Text>
          <Text lilbit primary right style={{ flex: 1 }}>
            Rp. {this.state.total_price}
          </Text>
        </View>
      </View>
    );
  };

  async toPayment(){
    this.props.navigation.navigate("Payment", {total_price : this.state.total_price})
  }

  render() {
    const list = [
      { id: 0, title: "Perekrutan Helper x1", price: "1.000.000" },
      { id: 1, title: "Pajak", price: "100.000" },
    ];
    return (
      <View style={styles.parent}>
        <ScrollView style={{ flex: 1 }}>
          <View padding={theme.sizes.base}>
            <Text bold>Total Invoice</Text>
          </View>
          <View
            color={"white"}
            padding={theme.sizes.base}
            margin={[0, theme.sizes.base, theme.sizes.base]}
            radius={theme.sizes.base / 2}
            shadow
          >
            <FlatList
              data={this.state.price_data}
              renderItem={({ item }) => this.item(item)}
              keyExtractor={(item) => item.id}
              ListFooterComponent={() => this.itemFooter()}
              ItemSeparatorComponent={() => (
                <View height={theme.sizes.lilbit} />
              )}
            />
          </View>
        </ScrollView>
        <View
          padding={theme.sizes.base}
          color={theme.colors.white}
          style={{ elevation: 6 }}
        >
          <Button color="secondary" onPress={() => this.toPayment()}>
            <Text white center>
              LANJUT
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class PaymentGateway extends Base {
  static navigationOptions = {
    title: "Payment",
  };
  alert() {
    const { navigate, dispatch } = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "DetailHelper",
          params: { navigateFrom: "PaymentGateway" },
        }),
      ],
    });
    Alert.alert(
      "Berhasil",
      "Payment Success, Terima kasih",
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {
        //   text: 'Cancel',
        //   // onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: "Lanjutkan", onPress: () => dispatch(resetAction) },
      ],
      { cancelable: false }
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.parent}>
        <View flex={1} middle center padding={theme.sizes.base}>
          <Text title>Payment Gateway</Text>
        </View>
        <View padding={theme.sizes.base} color={'white'} style={{elevation: 6}}>
          <Button color="secondary" onPress={() => navigate('PaymentStatus')}>
            <Text white center>
              KONFIRMASI
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class PaymentStatus extends Base {
  static navigationOptions = {
    title: 'Payment Status'
  }
  render(){
    const {dispatch} = this.props.navigation
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "DetailHelper",
          params: { navigateFrom: "PaymentGateway" },
        }),
      ],
    });
    return(
      <View style={styles.parent}>
        <View flex={1} center middle>
          <FAIcon name={'check-circle'} size={theme.sizes.base*10} color={theme.colors.success} />
          <View marginTop={theme.sizes.base}>

          </View>
          <Text bold>TERIMA KASIH</Text>
          <Text >PEMBAYARAN ANDA BERHASIL</Text>
        </View>
        <View padding={theme.sizes.base} color={'white'} style={{elevation: 6}}>
          <Button color="secondary" onPress={() => dispatch(resetAction)}>
            <Text white center>
              LANJUT
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

export { Payment, CheckOut, PaymentGateway, PaymentStatus };

const styles = GlobalStyle;
