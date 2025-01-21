import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updateProfileForm: FormGroup | any;
  previewImage: string | ArrayBuffer | null = null;
  user: any;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.updateProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      profile: [''],
    });
  }
  async ngOnInit() {
    await this.getProfile();
  }

  async getProfile() {
    const response: any = await this.userService.getProfile();
    this.user = response?.data || {};
    this.updateProfileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      profile: this.user.profile
        ? `${environment.IMAGES_PATH}/${this.user.profile}`
        : '',
    });
    this.previewImage = `${environment.IMAGES_PATH}/${this.user.profile}`;
  }

  async updateProfileData() {
    this.updateProfileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      profile: this.user.profile
        ? `${environment.IMAGES_PATH}/${this.user.profile}`
        : '',
    });
    this.previewImage = `${environment.IMAGES_PATH}/${this.user.profile}`;
  }

  // Trigger file input manually
  triggerFileInput() {
    const fileInput = document.getElementById(
      'profilePicture'
    ) as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateProfileForm.patchValue({ profile: file });
        this.previewImage = reader.result;
        console.log(this.updateProfileForm.profile);
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateProfileForm.profile = file;
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  async updateProfile() {
    console.log(this.updateProfileForm.valid);
    try {
      if (this.updateProfileForm.valid) {
        const formData = new FormData();
        formData.append('name', this.updateProfileForm.get('name')?.value);
        formData.append('email', this.updateProfileForm.get('email')?.value);

        const profileValue = this.updateProfileForm.get('profile')?.value;

        console.log(profileValue instanceof File, profileValue);
        // Check if the profile image is of type File
        if (profileValue instanceof File) {
          formData.append('profile', profileValue);
        }
        const response: any = await this.userService.updateProfile(formData);
        this.user = response.data;
        await this.updateProfileData();
      }
    } catch (err) {
      console.log(err);
    }
  }
}
