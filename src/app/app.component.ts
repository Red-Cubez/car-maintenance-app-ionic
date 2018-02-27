import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobPro } from '@ionic-native/admob-pro';

import { HomePage } from '../pages/home/home';

interface AdmobType{
  banner: 'ca-app-pub-6090043016684135/1228265856',
 };
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private admob: AdMobPro ,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      var admobid: AdmobType;
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = {
          banner: 'ca-app-pub-6090043016684135/1228265856'
        };
      }
      else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = {
          banner: 'ca-app-pub-6090043016684135/1228265856'
        };
      }
      this.admob.createBanner({
        adId: admobid.banner,
        autoShow: true,
      })
    });
  }
}

