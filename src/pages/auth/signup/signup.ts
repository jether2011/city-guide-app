import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../entity/user';
import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  backgrounds = [
    'assets/imgs/background/bg-1.png',
    'assets/imgs/background/bg-2.jpg',
    'assets/imgs/background/bg-3.jpg',
    'assets/imgs/background/bg-4.jpg',
  ];

  public signupForm:any;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder
    , private authProvider: AuthProvider
    , private alert: AlertController
    , private loading: LoadingController) {

      this.signupForm = formBuilder.group({
        email: ['', Validators.required]
        , password: ['', Validators.compose([
          Validators.minLength(6), Validators.maxLength(20), Validators.required
        ])]
        , passwordConfirmation: ['', Validators.compose([
          Validators.minLength(6), Validators.maxLength(20), Validators.required
        ])]
        , firstName: ['', Validators.required]
        , lastName: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  register() {
    let wrongPassword = this.signupForm.value.password 
      !== this.signupForm.value.passwordConfirmation;

    console.log(wrongPassword);

    if(wrongPassword) {
      const alert = this.alert.create({
        title: 'Ops!',
        subTitle: 'The password must be the same, please write again both!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let user = new User(null
        , this.signupForm.value.email
        , this.signupForm.value.password
        , this.signupForm.value.firstName
        , this.signupForm.value.lastName
        , new Date()
        , "");
  
        console.log(user);

        let loading = this.loading.create({
          content: "Creating User...."
        });
        loading.present();

        this.authProvider.registerUser(user).then(() => {
          loading.dismiss();

          const alert = this.alert.create({
            title: 'Success!',
            subTitle: 'User created!',
            buttons: ['OK']
          });
          alert.present();
        }, (error) => {
          loading.dismiss();

          const alert = this.alert.create({
            title: 'Error!',
            subTitle: 'User not created!',
            buttons: ['OK']
          });
          alert.present();
        });
    }
  }
}