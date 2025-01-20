import { AuthService } from '../../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { TranslateService } from '@ngx-translate/core';
import { LOCAL_STORAGE_KEYS } from '../../../global/constant';
import { RegexEnum } from 'src/app/global/regex-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm!: FormGroup;
  public messageList: any = {
    email: '',
    password: '',
  };

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router,
    private formService: FormService,
    public translation: TranslateService,
    private ngxLoader: NgxUiLoaderService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeMessages();
  }

  initializeLoginForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.email),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.passwordValidation),
        ]),
      ],
    });
  }

  initializeMessages() {
    this.messageList.name = {
      required: this.translation.instant('ERR_USERNAME_VALIDATION'),
    };
    this.messageList.email = {
      pattern: this.translation.instant('ERR_EMAIL_INVALID'),
      required: this.translation.instant('ERR_EMAIL_REQUIRED'),
    };

    this.messageList.password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_PASSWORD_REQUIRED'),
    };
  }

  async register() {
    this.formService.markFormGroupTouched(this.registerForm);
    if (this.registerForm.valid) {
      this.ngxLoader.start();
      const response: any = await this.authService.login(
        this.registerForm.value
      );
      if (response && response.data) {
        await this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.TOKEN,
          response.data.token
        );
        await this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.NAME,
          response.data.name
        );
        this.router.navigate(['/user/dashboard']);
      }
      this.ngxLoader.stop();
    }
  }
  navigateToLogin() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
