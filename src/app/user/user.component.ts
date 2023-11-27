import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public showForm: boolean = false;
  public userForm!: FormGroup;
  public submittedData: any[] = [];
  public isEdit: boolean = false;
  public selectedEditIndex: number = -1; // Track the index of the item being edited

  constructor(private fb: FormBuilder) { }
  
  public ngOnInit() {
    this.showForm = false;
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      course: ['', [Validators.required]]
    });
  }

  public openForm(): void {
    this.showForm = true;
    this.isEdit = false; // Reset the edit mode when opening the form
  }

 
  public onSubmit(): void {
    if (this.userForm.valid) {
        console.log('Form submitted:', this.userForm.value);
        const userData = this.userForm.value;

        if (this.isEdit) {
            // Update existing data at the selected index
            this.submittedData[this.selectedEditIndex] = userData;
            this.isEdit = false; // Reset edit mode
        } else {
            // Add new data
            this.submittedData.push(userData);
        }

        this.closeForm();
    } else {
        console.log('Form is invalid. Please fill in all required fields.');
    }
    console.log(this.submittedData);
}

// ... (existing methods)


  public onDelete(deleteData: number): void {
    this.submittedData.splice(deleteData, 1);
  }

  public onEdit(editData: number): void {
    this.isEdit = true;
    this.selectedEditIndex = editData;

    // Directly update the form values without opening the form
    const editItem = this.submittedData[editData];
    this.userForm.setValue({
        email: editItem.email,
        password: editItem.password,
        gender: editItem.gender,
        course: editItem.course
    });

    // Remove the item from the submittedData array
    this.submittedData.splice(editData, 1);



    
    this.openForm(); // Open the form for editing
  }

  private closeForm(): void {
    this.showForm = false;
    this.isEdit = false;
    this.selectedEditIndex = -1;
    this.userForm.reset();
  }
}
