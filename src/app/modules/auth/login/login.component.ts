import { AuthService } from '../../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { TranslateService } from '@ngx-translate/core';
import { constants, LOCAL_STORAGE_KEYS } from '../../../global/constant';
import { RegexEnum } from 'src/app/global/regex-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegexEnum.email),
        ]),
      ],
      password: ['', [Validators.required]],
    });
  }

  initializeMessages() {
    this.messageList.email = {
      pattern: this.translation.instant('ERR_EMAIL_INVALID'),
      required: this.translation.instant('ERR_EMAIL_REQUIRED'),
    };

    this.messageList.password = {
      required: this.translation.instant('ERR_PASSWORD_REQUIRED'),
    };
  }

  async login() {
    this.formService.markFormGroupTouched(this.loginForm);
    if (this.loginForm.valid) {
      this.ngxLoader.start();
      const response: any = await this.authService.login(this.loginForm.value);
      if (response && response.data) {
        await this.localStorageService.setLocalStore(
          LOCAL_STORAGE_KEYS.TOKEN,
          response.data.token
        );
        await this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.TOKEN,
          response.data.token
        );
        await this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.REFERESH_TOKEN,
          response.data.referesh
        );
        await this.localStorageService.setDataInIndexedDB(
          LOCAL_STORAGE_KEYS.NAME,
          response.data.name
        );
        this.router.navigate(['/home']);
      }
      this.ngxLoader.stop();
    }
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
