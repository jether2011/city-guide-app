import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  backgrounds = [
    'assets/imgs/background/bg-1.png',
    'assets/imgs/background/bg-2.jpg',
    'assets/imgs/background/bg-3.jpg',
    'assets/imgs/background/bg-4.jpg',
  ];

  public loginForm:any;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.required]
        , password: ['', Validators.required, Validators.compose([
          Validators.minLength(6), Validators.maxLength(20)
        ])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

}
