import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../../src/app/services/packages.service';
import { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { Package } from '../../src/app/models/packages';

@Component({
  selector: 'app-edit-package',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ],
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css'],
})
export class EditPackageComponent implements OnInit {
  packageForm!: FormGroup;
  imageName: string | null = null;
  packageId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packagesService: PackagesService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPackageData();
  }

  initForm() {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      quantityAvailable: [0, Validators.min(0)],
      price: [0, Validators.required],
      image: [''],
      base64Image: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: [0, Validators.required],
      isDeleted: [false]
    });
  }

  loadPackageData() {
    const packageId = this.route.snapshot.paramMap.get('id');
    if (packageId) {
      this.packageId = +packageId;
      this.packagesService.getPackageById(this.packageId).subscribe(packageData => {
        if (packageData.startDate) {
          packageData.startDate = new Date(packageData.startDate); 
        }        this.packageForm.patchValue(packageData);
        this.imageName = packageData.image || '';
      });
    }
  }

  get formControls() {
    return this.packageForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;

      this.convertToBase64(file).then((base64: string) => {
        this.packageForm.patchValue({
          base64Image: base64 
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
    if (this.packageForm.valid) {
      this.updatePackage();
    } else {
      this.packageForm.markAllAsTouched();
    }
  }

  updatePackage(): void {
    console.log('Updating package with data:', this.packageForm.value);
    const formData = this.packageForm.value;
    formData.id = this.packageId; // Assign the packageId to formData
    this.packagesService.update(formData).subscribe(
      () => {
        this.router.navigateByUrl('Admin/Packagelist');
      },
      (error) => {
        console.error('Package update failed:', error);
      }
    );
  }
}
