import { Departamento } from './../models/departamento.model';
import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends ServiceFirebase<Departamento> {

  constructor(firestore: AngularFirestore) {
    super(Departamento, firestore, 'departamentos')
   }

   
}
