import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {
  private static readonly errorMessages = {
    email: (params: any, ctName: string) => `${ctName} must be a valid email address`,
    required: () => `This field is required`,
    dateRangeInvalid: (params: any, ctName: string) => `${ctName} is invalid`,
    minlength: (params: any) => `The min number of characters is ${params.requiredLength}`,
    maxlength: (params: any) => `The max allowed number of characters is ${params.requiredLength}`,
    pattern: (params: any) => `The required pattern is: ${params.requiredPattern}`,
    patternInvalid: (params: any) => `The required pattern is: ${params.regexp}`,
    years: (params: any) => params.message,
    countryCity: (params: any) => params.message,
    uniqueName: (params: any) => params.message,
    telephoneNumbers: (params: any) => params.message,
    telephoneNumber: (params: any) => params.message,
    min: (params: any) => `Minimum value should be greater than or equal to ${params.min}`,
    max: (params: any) => `Maximum value should be less than ${params.max}`,
  };

  @Input() control: AbstractControlDirective | AbstractControl | any;
  @Input() messages: Record<string, any> = {}; // Providing a more specific type
  @Input() controlName: string | undefined;

  constructor() {}

  ngOnInit(): void {
    if (!this.controlName && this.control instanceof FormControl) {
      this.controlName = this.getControlName(this.control) || undefined;
    }
  }

  shouldShowErrors(): boolean {
    if (!this.control) {
      return false;
    }
  
    // Checking for control.errors explicitly and ensuring it doesn't return null/undefined
    const isFormDirty = (this.control as FormControl).parent?.dirty ?? false;
  
    return (
      !!this.control.errors && 
      this.control.touched && 
      this.control.dirty && 
      isFormDirty
    ) || false;
  }
  
  

  listOfErrors(): string[] {
    if (!this.control?.errors) return []; // Guard clause for errors being null or undefined
    
    // Ensure field is of a valid error type key
    return Object.keys(this.control.errors).map((field) => {
      // Type assertion to ensure field is a valid key for this.control.errors
      return this.getMessage(field as keyof typeof ValidationMessageComponent.errorMessages, this.control.errors[field]);
    });
  }
  

  private getControlName(c: any): string | null {
    const formGroup = c.parent?.controls;
    const controlName = Object.keys(formGroup || {}).find((name) => c === formGroup![name]) || null;
    return controlName ? this.prettifyCamelCase(controlName) : null;
  }

  private getMessage(type: keyof typeof ValidationMessageComponent.errorMessages, params: any): string {
    // Use the custom messages if available or fall back to default errorMessages
    return (
      this.messages[type] ||
      (ValidationMessageComponent.errorMessages[type] ? 
        ValidationMessageComponent.errorMessages[type](params, this.controlName || '') : 
        `Unknown error: ${type}`)
    );
  }
  

  private prettifyCamelCase(str: string): string {
    if (!str) return '';
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
              .replace(/([A-Z])([A-Z])/g, '$1 $2')
              .replace(/[-_]/g, ' ')
              .replace(/^./, (match) => match.toUpperCase());
  }
}
