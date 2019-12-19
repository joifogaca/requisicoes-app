import { DepartamentoComponent } from './departamento.component';
import { DepartamentoModule } from './departamento.module';
import { Departamento } from './../../../models/departamento.model';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '', component : DepartamentoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
