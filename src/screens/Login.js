import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, AsyncStorage, Picker } from 'react-native'
import { Text, View } from 'react-native-animatable'
import axios from 'axios';
import Config from 'react-native-config';

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metric'


export default class Login extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired
  }

 constructor(props) {
  super(props);
  this.state = {
    email: '',
    password: '',
  }
  this.handleLogin = this.handleLogin.bind(this);
 }
  handleLogin() {
    let { email, password } = this.state;
    axios.post(Config.API_URL+'login', {
      username: email,
      password: password
    })
    .then(response => {
      if (response.success) {

      }
      else {
        alert(res.message);
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
          <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 320 }}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Senior Pastor" value="sp" />
          <Picker.Item label="Choir" value="choir" />
        </Picker>
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onLoginPress(email, password)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Log In'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'New member?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
