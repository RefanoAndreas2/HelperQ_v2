import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
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

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
    };
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
              {option}
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
              Rp. 1.000.000
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
            options={options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
        </ScrollView>
        <View padding={theme.sizes.base} color={'white'} style={{elevation: 6}}>
          <Button color='secondary' onPress={() => navigate("PaymentGateway")}>
            <Text white center>
              PROSES
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class CheckOut extends Component {
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
            Rp. [Total]
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const list = [
      { id: 0, title: "Perekrutan Helper x1", price: "1.000.000" },
      { id: 1, title: "Pajak", price: "100.000" },
    ];
    const { navigate } = this.props.navigation;
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
              data={list}
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
          <Button color="secondary" onPress={() => navigate("Payment")}>
            <Text white center>
              LANJUT
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

class PaymentGateway extends Component {
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

class PaymentStatus extends Component {
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
