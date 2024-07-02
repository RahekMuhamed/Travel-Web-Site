import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../../src/app/services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css',
})
export class EditServiceComponent implements OnInit {
  ServiceForm: FormGroup;
  imageName: string | null = null;
  ServiceId: number | undefined;
  base64Image: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService // Adjust service name as per your actual service
  ) {
    this.ServiceForm = this.fb.group({
      name: ['', Validators.required],
      quantityAvailable: [0],
      price: [0, Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      image: [''], // For displaying the current image, if needed
      base64Image: ['', Validators.required], // For handling the uploaded image
      isDeleted: [false],
    });
  }

  ngOnInit(): void {
    this.loadServiceData();
  }

  loadServiceData(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId) {
      this.ServiceId = +serviceId;
      this.servicesService
        .getserviceById(this.ServiceId)
        .subscribe((serviceData) => {
          if (serviceData.startDate) {
            serviceData.startDate = new Date(serviceData.startDate);
          }
          this.ServiceForm.patchValue(serviceData);
          this.imageName = serviceData.image || '';
        });
    }
  }

  get formControls() {
    return this.ServiceForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;

      this.convertToBase64(file)
        .then((base64: string) => {
          this.base64Image = base64;
          this.ServiceForm.patchValue({
            base64Image: base64,
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
    if (this.ServiceForm.valid) {
      this.updateService();
    } else {
      this.ServiceForm.markAllAsTouched();
    }
  }

  updateService(): void {
    const formData = this.ServiceForm.value;
    formData.id = this.ServiceId;
    this.servicesService.update(formData).subscribe(
      () => {
        alert('Service updated successfully!');
        this.router.navigateByUrl('/Admin/servicelist');
      },
      (error) => {
        console.error('Service update failed:', error);
      }
    );
  }
}
