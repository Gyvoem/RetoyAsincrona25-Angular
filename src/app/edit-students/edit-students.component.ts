import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.css']
})
export class EditStudentsComponent implements OnInit {

  addForm:any;

  HobbyList: any = ["Cricket",'Movies','TV','Reading','Magazine'];
  HobbyArray: any[] = [];
  vals = ''
  data= this.vals.split(',');
  student_id: any;
  hobbies: any;
  hbs: any;
 
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService:StudentsService,
    private url:ActivatedRoute
    ) {

      this.addForm = this.formBuilder.group({
        id:[],
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
  
     

     parse() {
      const result=this.HobbyList.map(
     (x:any, index:any) => (this.HobbyArray[index].value ? x : null)
      ).filter((x:any) => x);
      return result.length>0?result:null
     }

  ngOnInit(): void {

    this.student_id = this.url.snapshot.params['id'];
    if (this.student_id>0) {
      this.studentService.getSingleStudent(this.student_id).subscribe((
        (data:any)=>{
          //console.log(data.data);
          this.addForm.patchValue(data.data);
          this.hobbies = data.data.hobbies;
          this.hbs =  this.hobbies.split(',')
          //console.log(this.hbs[1]);
          this.setAutorized(this.hbs)
        }

      ))
    }

    //console.log(this.student_id);

    
    
  }


 setAutorized(data: string[]) {
   this.HobbyArray = this.HobbyList.map((x:any) => ({
     name: x,
     value: data.indexOf(x) >= 0
   }));
 }


 onEdit(){
   
    // console.log(this.addForm.value)
    this.studentService.editStudent(this.addForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });

  }

}
