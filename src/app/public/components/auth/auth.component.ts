import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExcelService } from '../../services/excel.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  excelService = inject( ExcelService )
  authService = inject( AuthService )
  toastrService = inject( ToastrService )
  fb = inject( FormBuilder )
  
  private router = inject( Router )

  public registerForm : FormGroup = this.fb.group({
    firstName:['harijan', [ Validators.required, Validators.minLength(3) ] ],
    lastName:['fernandez', [ Validators.required, Validators.minLength(3) ] ],
    mobile:['939056445', [ Validators.required ] ],
    email:['har.fernandez@hotmail.com',[ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(6) ] ],
    confirmationPass: ['123456', [ Validators.required, Validators.minLength(6) ] ],
    dob: ['26/11/1990', [ Validators.required] ]
  })

  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  })

  public showLogin:boolean=true;

  changeForm():void {
    this.showLogin=!this.showLogin
  }

  downloadExcel():void { 
    let data:string[] = []
    for (const key in this.registerForm.value) {
      if (this.registerForm.value.hasOwnProperty(key)) {
        data.push(this.registerForm.value[key]);
      }
    }
    this.excelService.downloadExcel(data)
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      console.log(base64Image);
    };

    reader.readAsDataURL(file);
  }
  login() {
    const { email, password } = this.loginForm.value;
    if (email && password)
    this.authService.login( email, password ).subscribe({
     next: () => {
      this.router.navigateByUrl('private/dashboard')
    },
     error: (e) => this.toastrService.error(e.error.message)
    })
   }

   async register(){
      this.authService.register( this.registerForm.value ).subscribe({
        next: (data) => {
          this.toastrService.success(data.message);
          this.loginForm.reset();
          this.changeForm()
        }
      })
   }
}

