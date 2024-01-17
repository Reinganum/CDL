import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from 'src/app/public/services/pacientes.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  public usuario:any
  public fb = inject( FormBuilder )
  public activeModal = inject( NgbActiveModal )
  
  private pacientesService = inject( PacientesService )
  
  public patientForm=this.fb.group({
    firstName:['hari', [ Validators.required, Validators.minLength(2) ]],
    lastName:['mana', /* [ Validators.required, Validators.minLength(2) ] */],
    type:[''],
    mobile:['93905434', [ /* Validators.required, Validators.minLength(8) */,  Validators.pattern("^[0-9]*$")]],
    email:['asd@hotmail.com'],
    address:['hornopiren'],
    dob: [''],
    rut:['181154543'],
    occupation:['estudiante'],

    // CAMPOS DEL CONTACTO DE EMERGENCIA 

    cFirstName:['alah', [ Validators.required, Validators.minLength(2) ]],
    cLastName:['akbar', /* [ Validators.required, Validators.minLength(2) ] */],
    cMobile:['9282832', [ /* Validators.required, Validators.minLength(8) */,  Validators.pattern("^[0-9]*$")]],
    cEmail:['kala@gmail.com'],
    cAddress:['pirihueico'],
    cRut:['19128292'],
    cRole:['padre'],
  })
  

  constructor( private toastrService: ToastrService ){
    this.patientForm.controls['type']?.setValue('Tipo paciente', {onlySelf: true});
  }

  get patientType(){
    return this.patientForm.controls['type']?.value
  }

  onSubmitEdicion(){
    
  }

  onSubmit(){
    let patientData = { 
      firstName:this.patientForm.value.firstName,
      lastName:this.patientForm.value.lastName,
      type:this.patientForm.value.type,
      mobile:this.patientForm.value.mobile,
      email: this.patientForm.value.email,
      address:this.patientForm.value.address,
      dob:this.patientForm.value.dob,
      rut:this.patientForm.value.rut,
      occupation:this.patientForm.value.occupation,
      caregiver:[{
        cfirstName: this.patientForm.value.cFirstName,
        clastName: this.patientForm.value.cLastName,
        cemail: this.patientForm.value.cEmail,
        cmobile: this.patientForm.value.cMobile,
        caddress: this.patientForm.value.cAddress,
        crut: this.patientForm.value.cRut,
        croles: this.patientForm.value.cRole,
      }]
    }
    this.pacientesService.createPatient( patientData ).subscribe({
      next: (data) => {
        if(data.success){
          this.toastrService.success( data.success );
          this.activeModal.close('success')
        } else {
          this.toastrService.error(data)
          console.log(data)
        }
      }
    }) 
  }
}
