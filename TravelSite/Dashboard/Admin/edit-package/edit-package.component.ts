import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../../../src/app/services/packages.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

import { Package } from '../../../src/app/models/packages';

@Component({
  selector: 'app-edit-package',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css'],
})
export class EditPackageComponent implements OnInit {
  packageForm: FormGroup;
  imageName: string | null = null;
  packageId: number | undefined;
  base64Image: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packagesService: PackagesService
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      quantityAvailable: [0],
      price: [0, Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: [0, Validators.required],
      image: [''], // For displaying the current image, if needed
      base64Image: ['', Validators.required], // For handling the uploaded image
      isDeleted: [false],
    });
  }

  ngOnInit(): void {
    this.loadPackageData();
  }

  loadPackageData(): void {
    const packageId = this.route.snapshot.paramMap.get('id');
    if (packageId) {
      this.packageId = +packageId;
      this.packagesService
        .getPackageById(this.packageId)
        .subscribe((packageData) => {
          if (packageData.startDate) {
            packageData.startDate = new Date(packageData.startDate); // Ensure startDate is converted to Date object if needed
          }
          this.packageForm.patchValue(packageData); // Patch retrieved package data to the form
          this.imageName = packageData.image || ''; // Set the imageName to display the current image name
        });
    }
  }

  get formControls() {
    return this.packageForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name; // Update the imageName to show the newly uploaded image name

      this.convertToBase64(file)
        .then((base64: string) => {
          this.base64Image = base64; // Update the base64Image with the converted image data
          this.packageForm.patchValue({
            base64Image: base64, // Patch the base64Image field in the form with the converted image data
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
    if (this.packageForm.valid) {
      this.updatePackage();
    } else {
      this.packageForm.markAllAsTouched();
    }
  }

  updatePackage(): void {
    const formData = this.packageForm.value;
    formData.id = this.packageId;
    this.packagesService.update(formData).subscribe(
      () => {
        alert('Package updated successfully!');

        this.router.navigateByUrl('Admin/Packagelist');
      },
      (error) => {
        console.error('Package update failed:', error);
      }
    );
  }
}
