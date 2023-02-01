import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './add-students/add-students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const routes: Routes = [

  { path: '', component: ListStudentsComponent, pathMatch: 'full'},
  {path: 'add-student', component: AddStudentsComponent},
  {path: 'edit/:id', component: EditStudentsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
