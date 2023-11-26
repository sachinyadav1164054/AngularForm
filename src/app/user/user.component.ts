import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public showForm: boolean =false;
  public userForm!: FormGroup;
  public submittedData: any[] = []; //for array to store data
  public isEdit : boolean = false;

  constructor(private fb: FormBuilder) { }
  
public ngOnInit(){
  this.showForm = false;
  this.userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    course: ['', [Validators.required]]
  });
}

 public openForm() :void  {
    this.showForm = true;
  }

 public  onSubmit() :void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
     
      const userData = this.userForm.value;
      this.submittedData.push(userData);  // Changed this line
      // this.closeForm();
      // You can send the form data to your backend or perform other actions here.
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
    console.log(this.submittedData);
  }

  public onDelete(deleteData:number) : void {
    const index: number =this.submittedData.indexOf(deleteData);
    if (index ===-1) {

      this.submittedData.splice(deleteData,1);
    }
   
  }

  public onEdit(editData:number) : void {
    this.isEdit = true;
    // const index: number =this.submittedData.indexOf(editData);
    // if (index ===-1) {
    //   this.submittedData.splice(editData,1);
    // }
   
  }
}





 
