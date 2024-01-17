import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-componer',
  templateUrl: './componer.component.html',
  styleUrls: ['./componer.component.css']
})
export class ComponerComponent {

  public fb = inject( FormBuilder )
  public composeForm = this.fb.group({
    title: ['', [ Validators.required, Validators.minLength(4)] ],
    body:  ['', [ Validators.required, Validators.minLength(10)] ],
  }) 

  submit():void {
    localStorage.setItem('publicacion', JSON.stringify(this.composeForm.value))
  }

  reset():void {
    this.composeForm.reset()
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

}
