import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { ServiceFirebase } from '../core/iservicefirebase.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends ServiceFirebase<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, "funcionarios")
   }
}
