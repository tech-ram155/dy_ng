import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateBlogComponent {
  @Input() blogData: any;
  @Output() formSubmit = new EventEmitter<any>();
  blogForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.blogData) {
      this.blogForm.patchValue(this.blogData);
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.formSubmit.emit(this.blogForm.value);
    }
  }
}
