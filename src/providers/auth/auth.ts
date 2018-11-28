import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../../entity/user';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth
    , public afDB: AngularFireDatabase) {
  }

  registerUser(user:User): any {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(user.getEmail, user.getPassword)
      .then((newUser) => {
        return this.afAuth.auth
          .signInWithEmailAndPassword(user.getEmail, user.getPassword)
          .then((authUser) => {
              let uid = authUser.user.uid;
              let u = {
                uid: uid,
                registeredDate: user.getCreated,
                name: user.getFirstName + " " + user.getLastName,
                firstName: user.getFirstName,
                lastName: user.getLastName,
                email: user.getEmail,
                photoURL: user.getProfilePicture
              }

              newUser.user.updateProfile({
                displayName: user.getFirstName + " " + user.getLastName,
                photoURL: "" 
              });

              return this.afDB.list('userProfile').update(uid, u)
                .then(() => true, error => {
                    throw new Error(error.message)
                  });
          }, error => {
            throw new Error(error.message)
          })
      }, error => {
        throw new Error(error.message)
      });
  }
}
