import React, { Component } from 'react'
import { StyleSheet, Modal, AsyncStorage } from 'react-native'
import axios from 'axios'

export default class Base extends Component{
    url = 'http://helperq-lumen.propertigo.id'
	url_image = 'http://helperq-lumen.propertigo.id/images'
    axios = axios
    
    constructor(props){
		super(props)
	}
}