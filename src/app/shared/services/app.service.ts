import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import * as socketIo from 'socket.io-client'
import { Http } from '@angular/http';

import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth' 


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public users: Observable<any> ;
  public socket;
  public allow = false;
  private url = "http://localhost:8080";
  private local = "http://localhost:3000";
  private website = "https://sonoch.uz"
  constructor(private db: AngularFirestore, private http: Http, private afAuth: AngularFireAuth) {
    this.socket = socketIo(this.website + '/socket')
  
    this.users = this.db.collection('/users').valueChanges()
   
  }

  async googleSignin(){ 
    const provider = new auth.GoogleAuthProvider();
    
    const creadential = await this.afAuth.auth.signInWithPopup(provider)
    
    if( creadential.user.providerData.length > 0 ){
      console.log(creadential)
      this.allow = true;
    }
  }

  GithubAuth(){
    return this.AuthLogin(new auth.GithubAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }

  async logoutGoogle(){
      this.afAuth.auth.signOut()
      return this.allow = false
  }

  getUsers(){
    return this.http.get(this.url + "/users")
  }

  getFireUsers(){
    return this.users;
  }
}
