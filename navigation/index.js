import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'
import { createAppContainer, createSwitchNavigator} from "react-navigation"
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Text, View, GlobalStyle, Button, CustomInput } from '../components'
import { theme } from '../constants';
import {NavigationAction} from 'react-navigation'

import Login from '../screen/auth/Login'
// import Signup from '../screen/auth/Signup'
import Forget from '../screen/auth/Forget'
import Otp from '../screen/auth/Otp'


import {
  Kategori,
  Keterampilan,
  KeturunanSuku,
  NamaLengkap,
  Penempatan,
  PengalamanKerja,
  UploadFotoProfil,
  UploadKtp,
} from '../screen/auth/Form'

import { 
  AllList,
  CheckOut,
  DetailHelper,
  DetailOrder,
  Filter,
  Notification,
  OrderKontrakKerja,
  OrderListHelper,
  Payment,
  PaymentGateway,
  ProfileHelper,
  ProfileMajikan,
  ReviewRating,
  Verified,
} from '../screen/index'

import {
  Verifikasi,
  PrivacyPolicy,
  TermsAndCondition,
  ChangePassword,
  Settings,
  ViewRiwayatPekerjaan,
  ViewRiwayatKesehatan,
  ViewData,
  ViewProfile,
  ViewGeneral,
  ViewKeterampilan,
  ViewDokumen
} from '../screen/profile'

import Icon from 'react-native-vector-icons/MaterialIcons';

const materialTopTabStyle = {
  sceneContainerStyle: {
    backgroundColor: 'white'
  },
  tabBarOptions: {
    activeTintColor: theme.colors.white,
    inactiveTintColor: theme.colors.white_50p,
    indicatorStyle: {
      backgroundColor: theme.colors.white
    },
    style: {
      backgroundColor: theme.colors.primary
    },
    tabStyle: {
      // backgroundColor: 'white'
    },
    labelStyle: {
      fontWeight: 'bold'
    }
  },
  defaultNavigationOptions: {
    // swipeEnabled: false,
  }
}

const titleAndNotifStyle = {
  defaultNavigationOptions: {
    headerRight: () =>
      <View row>
        <TouchableOpacity activeOpacity={0.5} onPress={() => null}>
          <Icon name={'notifications'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    ,
    headerRightContainerStyle:{
      marginRight: theme.sizes.base
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
    headerStyle:{
      elevation: 0,
      backgroundColor: theme.colors.primary
    },
  }
}

const titleStyle = {
  defaultNavigationOptions: {
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
    headerStyle:{
      elevation: 0,
      backgroundColor: theme.colors.primary
    },
    headerTintColor: 'white'
  }
}

const authStack = createStackNavigator({
  Login,
  // Signup,
  Forget,
  Otp,
},{
  initialRouteName: "Login",
  defaultNavigationOptions: {
    headerShown: false,
  }
}
)

const formStack = createStackNavigator({
  NamaLengkap,
  Kategori,
  KeturunanSuku,
  PengalamanKerja,
  Penempatan,
  Keterampilan,
  UploadKtp,
  UploadFotoProfil,
},{
  defaultNavigationOptions:{
    title:'Isi Data',
    headerTintColor: theme.colors.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

const homeTab = createMaterialTopTabNavigator({
  AllList : {
    screen: AllList,
    navigationOptions: {
      title: 'All List'
    }
  },
  Verified
}, materialTopTabStyle
)

const homeStack = createStackNavigator({
  homeTab
},{
  defaultNavigationOptions: ({navigation}) => ({
    headerTitle: (
      <Button color='white'>
        <View row padding={[0, theme.sizes.base]}>
          <Icon name={'search'} size={24} color={theme.colors.black_t60} />
          <View paddingLeft={theme.sizes.base}>
            <Text color={theme.colors.black_t60}>Cari Pekerja / Pekerjaan</Text>
          </View>
        </View>
      </Button>

    ),
    headerRight: (
      <View row>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Filter')}>
          <Icon name={'filter-list'} size={24} color={'white'} />
        </TouchableOpacity>
        <View padding={theme.sizes.base*.5}/>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Notification')}>
          <Icon name={'notifications'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    ),
    headerTitleContainerStyle:{
      width: Dimensions.get('window').width-theme.sizes.base*7
    },
    headerRightContainerStyle:{
      marginRight: theme.sizes.base
    },
    headerStyle:{
      elevation: 0,
      backgroundColor: theme.colors.primary
    }
  })
})

const orderTab = createMaterialTopTabNavigator({
  OrderListHelper: {
    screen: OrderListHelper,
    navigationOptions: {
      title: 'List Helper'
    }
  },
  OrderKontrakKerja:{
    screen: OrderKontrakKerja,
    navigationOptions: {
      title: 'Kontrak Kerja'
    }
  }
}, materialTopTabStyle
)

const orderStack = createStackNavigator({
  orderTab
},{
  defaultNavigationOptions: {
    title: 'Order',
    headerRight: () =>
      <View row>
        <TouchableOpacity activeOpacity={0.5} onPress={() => null}>
          <Icon name={'notifications'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    ,
    headerRightContainerStyle:{
      marginRight: theme.sizes.base
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
    headerStyle:{
      elevation: 0,
      backgroundColor: theme.colors.primary
    }
  }
})

const profileTab = createMaterialTopTabNavigator({
  ProfileHelper: {
    screen: ProfileHelper,
    navigationOptions: {
      title: 'helper'
    }
  },
  ProfileMajikan: {
    screen: ProfileMajikan,
    navigationOptions: {
      title: 'majikan'
    }
  }
},materialTopTabStyle)

const profileStack = createStackNavigator({
  profileTab:{
    screen: profileTab,
    navigationOptions: {
      title: 'Profile'
    }
  }
},titleAndNotifStyle)

const indexBottomTab = createBottomTabNavigator({
  Home: {
    screen: homeStack,
    navigationOptions: {
      tabBarIcon: (
        ({focused, tintColor}) =>
          <Icon name={'home'} size={24} color={focused ? tintColor : tintColor}/>
        ),
    }
  },
  Order: {
    screen: orderStack,
    navigationOptions: {
      tabBarIcon: (
        ({focused, tintColor}) =>
          <Icon name={'assignment'} size={24} color={focused ? tintColor : tintColor}/>
        ),
    }
  },
  Profile: {
    screen: profileStack,
    navigationOptions: {
      tabBarIcon: (
        ({focused, tintColor}) =>
          <Icon name={'person'} size={24} color={focused ? tintColor : tintColor}/>
        ),
    }
  },
},{
  initialRouteName: 'Profile',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: theme.colors.primary
  }
})

const indexStack = createStackNavigator({
  Verifikasi,
  indexBottomTab:{
    screen: indexBottomTab,
    navigationOptions: {
      headerShown: false
    }
  },
  Settings,
  TermsAndCondition,
  PrivacyPolicy,
  ChangePassword,
  ViewRiwayatPekerjaan,
  ViewRiwayatKesehatan,
  ViewDokumen,
  ViewProfile,
  ViewKeterampilan,
  ViewGeneral,
  ReviewRating,
  DetailOrder,
  Filter,
  Notification,
  DetailHelper,
  PaymentGateway,
  CheckOut,
  Payment,

  //Profile
  ViewData,
},titleStyle)

const switcher = createSwitchNavigator({
  indexStack,
  authStack,
  formStack,
},{
  defaultNavigationOptions:{
  }
})

export default createAppContainer(switcher)

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});