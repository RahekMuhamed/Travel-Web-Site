import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Package } from '../../../src/app/models/packages';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PackagesService } from '../../../src/app/services/packages.service';
import { ServicesService } from '../../../src/app/services/services.service';
import { Services } from '../../../src/app/models/services';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-package',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgMultiSelectDropDownModule],
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css'],
})
export class EditPackageComponent implements OnInit {
  packageForm!: FormGroup;
  imageName: string | null = null;
  packageId: number | undefined;
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
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantityAvailable: [0],
      price: [0, Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: [0, Validators.required],
      image: [''],
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

    this.loadPackageData();
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

  loadPackageData(): void {
    const packageId = this.route.snapshot.paramMap.get('id');
    if (packageId) {
      this.packageId = +packageId;
      this.packageservice.getPackageById(this.packageId).subscribe(
        (packageData: any) => {
          if (packageData.startDate) {
            packageData.startDate = new Date(packageData.startDate);
          }
          this.packageForm.patchValue(packageData);
          this.imageName = packageData.image || '';
        },
        (error: any) => {
          console.error('Failed to load package data:', error);
        }
      );
    }
  }

  get formControls() {
    return this.packageForm.controls;
  }

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
  }

  calculateSecondLocationDuration(): void {
    const duration = this.packageForm.get('duration')?.value;
    const firstLocationDuration = this.packageForm.get('firstLocationDuration')?.value;
    if (duration !== null && firstLocationDuration !== null) {
      const secondLocationDuration = duration - firstLocationDuration;
      this.packageForm.patchValue({
        secondLocationDuration: secondLocationDuration >= 0 ? secondLocationDuration : 0,
      });
    }
  }

  save(): void {
    if (this.packageForm.valid) {
      const formData = this.packageForm.value;
      if (this.packageId) {
        formData.id = this.packageId;
        formData.firstLocation = parseInt(formData.firstLocation, 10);
        formData.secondLocation = parseInt(formData.secondLocation, 10);

        this.packageservice.update(formData).subscribe(
          () => {
            Swal.fire('Package updated successfully!');
            this.router.navigateByUrl('profile/Packagelist');
          },
          (error) => {
            console.error('Package update failed:', error);
          }
        );
      } else {
        // Add new package logic
        this.packageservice.add(formData).subscribe(
          () => {
            Swal.fire('Package added successfully!');
            this.router.navigateByUrl('profile/Packagelist');
          },
          (error) => {
            console.error('Package add failed:', error);
          }
        );
      }
    } else {
      this.packageForm.markAllAsTouched();
    }
  }
}
