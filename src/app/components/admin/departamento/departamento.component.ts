
import { DepartamentoService } from './../../../services/departamento.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/departamento.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamento$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogDepartamento: boolean;
  form: FormGroup;
  constructor(private departamentoService:DepartamentoService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.departamento$ = this.departamentoService.list();
    this.configForm();
  }

  configForm(){
    this.form = this.fb.group(
      {
        id: new FormControl(),
        nome: new FormControl('',Validators.required),
        telefone: new FormControl('')
      }
    )
  }

  add(){
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  selecionaDepartamento(depto: Departamento){
    this.edit = true;
    this.displayDialogDepartamento = true;
    this.form.setValue(depto);
  }

  save(){
    this.departamentoService.createOrUpdate(this.form.value)
    .then(() => {
      this.displayDialogDepartamento = false;
      Swal.fire(`Departamento 
      ${ !this.edit ? 'salvo' : 'atualizado' } com sucesso.`, '', 'success')
      .catch((erro) =>{
        this.displayDialogDepartamento = false;
        Swal.fire(`Erro ao ${ !this.edit ? 'salvo' : 'atualizado'} o departamento`,
        `Detales: ${erro}`, 'error');
        this.form.reset();

      })
    })
  }

}