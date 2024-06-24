import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../src/app/services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
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
    private ServicesService: ServicesService
  ) {
    this.ServiceForm = this.fb.group({
      name: ['', Validators.required],
      quantityAvailable: [0],
      price: [0, Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      image: [''], // For displaying the current image, if needed
      base64Image: ['', Validators.required], // For handling the uploaded image
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    this.loadServiceData();
  }

  loadServiceData(): void {
    const ServiceId = this.route.snapshot.paramMap.get('id');
    if (ServiceId) {
      this.ServiceId = +ServiceId;
      this.ServicesService.getserviceById(this.ServiceId).subscribe(ServiceData => {
        if (ServiceData.startDate) {
          ServiceData.startDate = new Date(ServiceData.startDate); // Ensure startDate is converted to Date object if needed
        }
        this.ServiceForm.patchValue(ServiceData); // Patch retrieved Service data to the form
        this.imageName = ServiceData.image || ''; // Set the imageName to display the current image name
      });
    }
  }

  get formControls() {
    return this.ServiceForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name; // Update the imageName to show the newly uploaded image name

      this.convertToBase64(file).then((base64: string) => {
        this.base64Image = base64; // Update the base64Image with the converted image data
        this.ServiceForm.patchValue({
          base64Image: base64 // Patch the base64Image field in the form with the converted image data
        });
      }).catch(error => console.error('Base64 conversion failed:', error));
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
    this.ServicesService.update(formData).subscribe(
      () => {
        alert('Service added successfully!');

        this.router.navigateByUrl('Admin/Servicelist');
      },
      (error) => {
        console.error('Service update failed:', error);
      }
    );
  }
}
