import { config } from './config/config'
import NotifService from './services/NotifService'
import DeviceInfo from 'react-native-device-info';

class AppStore {

  notif;

  _loggedIn = false;
  _fcmToken = '';

  constructor() {
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }


  async onRegister(token) {
    
    if (token) {
      this.fcmToken = token;
      console.log("fcmToken", token);

      let user = {
        fcmToken: token,
        deviceId: DeviceInfo.getUniqueId()
      }

      await fetch(`${config.basePathUrl}store-user`,{
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


}

export default new AppStore()