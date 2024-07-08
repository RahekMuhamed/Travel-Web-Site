import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Package } from '../../../src/app/models/packages';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PackagesService } from '../../../src/app/services/packages.service';
import { ServicesService } from '../../../src/app/services/services.service';
import { Services } from '../../../src/app/models/services';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthServiceService } from '../../../src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [ReactiveFormsModule, [FormsModule], CommonModule, NgMultiSelectDropDownModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})
export class AddPackageComponent implements OnInit {
  newpackage: Package = new Package(0, '', 0, false);

  packageForm!: FormGroup;
  imageName: string | null = null;
  base64Image: string | null = null;
  servicesList: Services[] = [];
  dropdownSettings = {};
  locationEnum = [
    { value: 0, label: 'Makkah' },
    { value: 1, label: 'Madinah' }
  ];
  filteredLocationOptions: { value: number, label: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private packageservice: PackagesService,
    private router: Router,
    private servicesService: ServicesService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantityAvailable: [''],
      price: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      //image: [''],
      isDeleted: [false],

      BookingTimeAllowed: ['', Validators.required],
      services: [[], Validators.required],
      firstLocation: ['', Validators.required],
      secondLocation: ['', Validators.required],
      firstLocationDuration: ['', Validators.required],
      secondLocationDuration: [{ value: '', disabled: true }, Validators.required],

  
    });
    this.fetchServices();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
    this.updateFilteredLocationOptions();
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
    return this.packageForm.controls;
  }
/*
  imageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageName = file.name;
      this.convertToBase64(file)
        .then((base64: string) => {
          this.base64Image = base64;
          this.packageForm.patchValue({
            image: base64,
          });
        })
        .catch((error) => {
          console.error('Base64 conversion failed:', error);
        });
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
  }*/

  calculateSecondLocationDuration(): void {
    const duration = this.packageForm.get('duration')?.value;
    const firstLocationDuration = this.packageForm.get('firstLocationDuration')?.value;
    if (duration && firstLocationDuration) {
      const secondLocationDuration = duration - firstLocationDuration;
      this.packageForm.patchValue({
        secondLocationDuration: secondLocationDuration >= 0 ? secondLocationDuration : 0,
      });
    }
  }

  onFirstLocationChange(): void {
    this.updateFilteredLocationOptions();
  }

  updateFilteredLocationOptions(): void {
    const firstLocationValue = this.packageForm.get('firstLocation')?.value;
    if (firstLocationValue !== null) {
      this.filteredLocationOptions = this.locationEnum.filter(location => location.value !== firstLocationValue);
    } else {
      this.filteredLocationOptions = this.locationEnum.slice();
    }
  }

  addPackage(): void {
    const packageData = this.packageForm.value;
    packageData.firstLocation = parseInt(packageData.firstLocation, 10);
    packageData.secondLocation = parseInt(packageData.secondLocation, 10);

    console.log('Adding package with data:', packageData);

    this.packageservice.add(packageData).subscribe(
      () => {
        Swal.fire('Package added successfully!');
        this.router.navigateByUrl('profile/Packagelist');
      },
      (error) => {
        console.error('Package save failed:', error);
        if (error.error && error.error.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    );
  }

  save(): void {
    if (this.packageForm.valid) {
      this.addPackage();
    } else {
      this.packageForm.markAllAsTouched();
    }
  }
}
