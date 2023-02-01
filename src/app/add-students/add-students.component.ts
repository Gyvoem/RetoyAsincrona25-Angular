import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  addForm: any;

  HobbyList: any = ["LECTURA",'PINTURA','TV','BAILE','DEPORTE','VIAJES'];
  HobbyArray: any[] = [];
  vals = ''
  data= this.vals.split(',');

  constructor( 
    private formBuilder: FormBuilder,
     private router: Router,
     private studentService:StudentsService
     ) {

      this.addForm = this.formBuilder.group({
        first_name: ['', Validators.required],  
        last_name: ['', [Validators.required, Validators.maxLength(20)]],  
        email: ['', [Validators.required, Validators.maxLength(20)]] ,
        password: ['', [Validators.required, Validators.maxLength(20)]] ,
        gender: ['', Validators.required],    
        hobbyField: new FormControl(this.data), 
        country: ['', Validators.required],   
      }
      )
     }

  get authorizedArray(){
    return this.addForm.get("hobbyField") as FormArray;
  }


  setAutorized(data: string[]) {
    this.HobbyArray = this.HobbyList.map((x:any) => ({
      name: x,
      value: data.indexOf(x) >= 0
    }));

  }

  // PARSE DE HOBBIES
  parse() {
    const result=this.HobbyList.map(
   (x:any, index:any) => (this.HobbyArray[index].value ? x : null)
    ).filter((x:any) => x);
    return result.length>0?result:null
   // console.log(result.length>0?result:null);
   }
 

   ngOnInit(): void {
    this.setAutorized(this.data)
  }


  onSubmit(){
   
    // console.log(this.addForm.value)
    this.studentService.createStudent(this.addForm.value).subscribe(
      (data:any)=>{
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });

  }


}

