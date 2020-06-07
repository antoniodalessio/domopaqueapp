import { config } from './config/config'
import NotifService from './services/NotifService'
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from "react-native-network-info";
//import { AppState } from 'react-native';
import EventEmitter from 'EventEmitter';
import io from 'socket.io-client';

import { httpService } from './services/httpServices'


class AppStore {

  notif;

  _loggedIn = false;
  _fcmToken = '';
  _ssid = null;
  _username = ''

  interval
  eventEmitter

  _socket = null;

  constructor() {
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    this.interval = setInterval(this.getSSID, 5000);
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on("ssidChange", this.atHome)

    this.socket = io(config.basePathUrl);

    this.socket.on('connect_failed', function(){
      console.warn("error");
      console.log('Connection Failed');
    });

    this.socket.on('connection init', () => {
      console.log('connection init');
      this.socket.emit('client response', {deviceID: DeviceInfo.getUniqueId()})
    });

    this.socket.on("test", () => {
      console.log("testttttttttt")
    })

  }

  getSSID = async () => {
    NetworkInfo.getSSID().then(ssid => {
      let oldSSID = this.ssid + "";
      this.ssid = ssid
      if(ssid != oldSSID) {
        this.eventEmitter.emit("ssidChange");
      }
      
    });
  }

  atHome = () => {
    if (this.ssid == 'Vodafone-50278807') {
      this.eventEmitter.emit("@home");
    }else{
      this.eventEmitter.emit("outOfHome");
    }
  }

  async onRegister(token) {
    
    if (token) {
      this.fcmToken = token;
      

      let user = {
        fcmToken: token,
        deviceId: DeviceInfo.getUniqueId(),
        username: this.username
      }

      console.log("user", user);

      await httpService(`${config.basePathUrl}store-user`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user
        }),
      });

    }

    
  }

  onNotif(notif) {
    //Alert.alert(notif.title, notif.message);
    console.log("test")
  }

  sendLocalPushNotification() {
    this.notif.localNotif()
  }

  handlePerm(perms) {
    //Alert.alert("Permissions", JSON.stringify(perms));
  }

  get loggedIn() {
    return this._loggedIn;
  }

  set loggedIn(val) {
    this._loggedIn = val;
  }

  get fcmToken() {
    return this._fcmToken;
  }

  set fcmToken(val) {
    this._fcmToken = val;
  }

  get ssid() {
    return this._ssid;
  }

  set ssid(val) {
    this._ssid = val;
  }

  get username() {
    return this._username;
  }

  set username(val) {
    this._username = val;
  }

  get socket() {
    return this._socket;
  }

  set socket(val) {
    this._socket = val;
  }


}

export default new AppStore()