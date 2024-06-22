import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Package } from '../../src/app/models/packages';
import { PackagesService } from '../../src/app/services/packages.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  newpackage: Package = new Package(0, "", false, "", "", 0, 0);
  packageForm!: FormGroup;
  imageName: string | null = null;
  base64Image: string | null = null;

  constructor(private formBuilder: FormBuilder, private packageservice: PackagesService, private router: Router) { }

  ngOnInit(): void {
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantityAvailable: [''],
      price: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      image: [''], // This will store the base64 string of the image
      isDeleted: [false]
    });
  }

  get formControls() {
    return this.packageForm.controls;
  }

  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;

      this.convertToBase64(file).then((base64: string) => {
        this.base64Image = base64; // Store base64 string
        this.packageForm.patchValue({
          image: base64 // Set the 'image' form control to the base64 string
        });
      }).catch(error => console.error('Base64 conversion failed:', error));
    }
  }


  convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Resolve with the base64 string
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        // Reject if FileReader encountered an error
        reject(error);
      };
    });
  }

  save(): void {
    if (this.packageForm.valid) {
      this.addPackage();
    } else {
      this.packageForm.markAllAsTouched();
    }
  }

  addPackage(): void {
    console.log('Adding package with data:', this.packageForm.value); // Debugging line
    this.packageservice.add(this.packageForm.value).subscribe(
      () => {
        alert('Package added successfully!');
        this.router.navigateByUrl("Admin/Packagelist");
      },
      (error) => console.error('Package save failed:', error)
    );
  }
}
