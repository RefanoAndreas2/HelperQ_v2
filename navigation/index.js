import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'
import { createAppContainer, createSwitchNavigator} from "react-navigation"
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Text, View, GlobalStyle, Button, CustomInput, Touch} from '../components'
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
  Filter,
  KontrakKerja,
  MainHome,
  MainProfile,
  Notification,
  OrderKontrakKerja,
  OrderListHelper,
  Payment,
  PaymentGateway,
  PaymentStatus,
  ProfileHelper,
  ProfileMajikan,
  ReviewRating,
  Verified,
} from '../screen/index'

import {
  ChangePassword,
  ListFoto,
  ListMajikan,
  PrivacyPolicy,
  Settings,
  TermsAndCondition,
  Verifikasi,
  ViewData,
  ViewDokumen,
  ViewGeneral,
  ViewKeterampilan,
  ViewProfile,
  ViewRiwayatKesehatan,
  ViewRiwayatPekerjaan,
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
      backgroundColor: theme.colors.primary,
    },
    tabStyle: {
      elevation: 9
      // backgroundColor: 'white'
    },
    labelStyle: {
      fontWeight: 'bold'
    },

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
  UploadKtp,
  NamaLengkap,
  Kategori,
  NamaLengkap,
  KeturunanSuku,
  PengalamanKerja,
  Penempatan,
  Keterampilan,
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
},{
  sceneContainerStyle: {
    backgroundColor: 'white'
  },
  tabBarOptions:{
    style: {
      backgroundColor: 'white',
      shadowColor: theme.colors.danger,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      // elevation: 20,
    },
    tabStyle: {
    }
  }
  // defaultNavigationOptions: {
  // }
  // materialTopTabStyle
}
)

const homeStack = createStackNavigator({
  // homeTab
  MainHome
},{
  defaultNavigationOptions: {
    headerShown:false
  }
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
}, {
  tabBarOptions: {
    // contentContainerStyle:{
    //   padding: theme.sizes.base,
    //   // backgroundColor: theme.colors.bgParent,
    // },
    tabStyle: {
      // backgroundColor: theme.colors.white,
    },
    activeTintColor: 'white',
    inactiveTintColor: theme.colors.black_t90,
    indicatorStyle: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      flex: 1,
      padding: theme.sizes.base*1.5,
      backgroundColor: theme.colors.primary_dark,
      borderRadius: theme.sizes.base/2
    },
    labelStyle:{
      fontSize: theme.sizes.base,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },
    style: {
      margin: theme.sizes.base,
      marginBottom: 0,
      backgroundColor: 'white',
      elevation: 0,
      borderRadius: theme.sizes.base/2,
      overflow: 'hidden',
    }
}, style: {
  backgroundColor: theme.colors.bgParent
}}
)

const orderStack = createStackNavigator({
  orderTab
},{
  defaultNavigationOptions: {
    title: 'Rekrut',
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
    screen: MainProfile,
    navigationOptions: {
      title: 'Profile',
      headerTitleStyle:{
        fontWeight: 'bold',
        color: theme.colors.primary
      },
      headerRight: () =>
      <View row color={'secondary'} wrap radius={theme.sizes.radius} marginRight={theme.sizes.base
      }>
        <Touch containerStyle={{padding: theme.sizes.base/2}} ripple={'white'}>
          <Icon name={'notifications'} size={24} color={'white'} />
        </Touch>
        {/* <TouchableOpacity activeOpacity={0.5} onPress={() => null}>
        </TouchableOpacity> */}
      </View>
    }
  }
},{
  defaultNavigationOptions: {
  }
})

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
  Rekrut: {
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
  initialRouteName: 'Rekrut',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: theme.colors.secondary
  }
})

const indexStack = createStackNavigator({
  ListMajikan,
  indexBottomTab:{
    screen: indexBottomTab,
    navigationOptions: {
      headerShown: false
    }
  },
  Verifikasi,
  ViewData,
  ViewProfile,
  ListFoto,
  DetailHelper,
  KontrakKerja,
  PaymentStatus,
  Payment,
  Settings,
  TermsAndCondition,
  PrivacyPolicy,
  ChangePassword,
  CheckOut,
  ViewRiwayatPekerjaan,
  ViewRiwayatKesehatan,
  ViewDokumen,
  ViewKeterampilan,
  ViewGeneral,
  ReviewRating,
  Filter,
  Notification,
  PaymentGateway,
},titleStyle)

const switcher = createSwitchNavigator({
  formStack,
  authStack,
  indexStack,
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