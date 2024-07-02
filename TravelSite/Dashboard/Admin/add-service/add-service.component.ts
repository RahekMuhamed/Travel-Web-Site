import { Component, OnInit } from '@angular/core';
import { Services } from '../../../src/app/models/services';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css',
})
export class AddServiceComponent implements OnInit {
  newservice: Services = new Services(0, '', 0, '');
  serviceForm!: FormGroup;
  imageName: string | null = null;
  base64Image: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private serviceservice: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantityAvailable: [''],
      price: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      image: [''],
      isDeleted: [false],
    });
  }

  get formControls() {
    return this.serviceForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;

      this.convertToBase64(file)
        .then((base64: string) => {
          this.base64Image = base64;
          this.serviceForm.patchValue({
            image: base64,
          });
        })
        .catch((error) => console.error('Base64 conversion failed:', error));
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  save(): void {
    if (this.serviceForm.valid) {
      this.addservice();
    } else {
      this.serviceForm.markAllAsTouched();
    }
  }

  addservice(): void {
    console.log('Adding service with data:', this.serviceForm.value);
    this.serviceservice.add(this.serviceForm.value).subscribe(
      () => {
        alert('service added successfully!');
        this.router.navigateByUrl('Admin/servicelist');
      },
      (error) => console.error('service save failed:', error)
    );
  }
}
