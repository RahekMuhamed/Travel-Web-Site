import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceProviderServiceService } from '../../../src/app/services/service-provider-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Services } from '../../../src/app/models/services';
import { ServicesService } from '../../../src/app/services/services.service';

@Component({
  selector: 'app-add-service-provider',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-service-provider.component.html',
  styleUrl: './add-service-provider.component.css',
})
export class AddServiceProviderComponent implements OnInit {
  serviceProviderForm!: FormGroup;
  servicesList: Services[] = [];
  imageName: string | null = null;
  base64Image: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private serviceProviderService: ServiceProviderServiceService,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceProviderForm = this.formBuilder.group({
      name: ['', Validators.required],
      services: [[], Validators.required],
      description: [''],
      logo: [''],
      isDeleted: [false],
    });

    this.fetchServices();
  }

  fetchServices(): void {
    this.servicesService.getAll().subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.servicesList = response.$values;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error) => {
        console.error('Failed to fetch services:', error);
      }
    );
  }

  get formControls() {
    return this.serviceProviderForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;

      this.convertToBase64(file)
        .then((base64: string) => {
          this.base64Image = base64;
          this.serviceProviderForm.patchValue({
            logo: base64,
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
    if (this.serviceProviderForm.valid) {
      this.addServiceProvider();
    } else {
      // Mark all form controls as touched to display validation messages
      this.serviceProviderForm.markAllAsTouched();
      console.error('Form validation failed:', this.serviceProviderForm.errors);
    }
  }

  addServiceProvider(): void {
    console.log(
      'Adding service provider with data:',
      this.serviceProviderForm.value
    );

    // Ensure services field is formatted correctly
    const formData = {
      ...this.serviceProviderForm.value,
      services: this.serviceProviderForm.value.services.map((service: any) =>
        service.toString()
      ),
    };

    this.serviceProviderService.add(formData).subscribe(
      () => {
        alert('Service provider added successfully!');
        this.router.navigateByUrl('Admin/ServiceProvider');
      },
      (error) => {
        console.error('Service provider save failed:', error);
        if (error.error && error.error.errors) {
          console.error('Validation Errors:', error.error.errors);
          // Handle specific error messages or display to user
        }
      }
    );
  }
}
