import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user : Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  login(email: string, senha: string): Promise<firebase.auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
  }

  logout(): Promise<void>{
    return this.afAuth.auth.signOut();
  }

  resetPassaword(email: string)
  {
    this.afAuth.auth.sendPasswordResetEmail(email);
  }

  
}
