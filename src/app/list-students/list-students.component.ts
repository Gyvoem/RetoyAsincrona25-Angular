import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  students: any;

  constructor(private studentservice: StudentsService) {}

  ngOnInit(): void {
    
    this.studentservice.getStudents().subscribe(
      (result:any)=>{
        // console.log(result)
        this.students = result.data;
        // Para visualizar los datos en CONSOLE LOG
        // console.log(data);
      }
    )
  }
  
  // ELIMINAR ESTUDIANTE
   deleteStudent(student:any){
    // console.log(id);
     this.studentservice.deleteStudent(student.id).subscribe(data=>{
      this.students = this.students.filter((u: any) => u !== student);
     })
   }
}
