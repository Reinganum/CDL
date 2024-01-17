import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from 'src/app/public/services/pacientes.service';
import { Patient, Session } from 'src/app/interfaces';
import * as jspdf from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { text } from 'stream/consumers';
import { AddPatientComponent } from 'src/app/modals/add-patient/add-patient.component';
import { EditSessionComponent } from 'src/app/modals/edit-session/edit-session.component';
import * as moment from 'moment';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit{

  @ViewChild('content', { static: false }) content!: ElementRef;

  private modalService = inject( NgbModal )
  public patientsService = inject( PacientesService )
  private toastrService = inject( ToastrService )
  private router = inject( Router )
  public route = inject( ActivatedRoute )
  public fetchedPatients!:any
  public fb = inject( FormBuilder )


  public searchForm = this.fb.group({
    fullName: [''],
    state: [''],
    date: [''],
    sessions: [''],
    type: ['']
  })
  filteredPatients:Patient|null=null

  constructor(){
    this.fetchPatients()
  }
  ngOnInit(): void {
   
  }

  reset(){
    this.searchForm.reset()
  }

  buscar(){
   
  }
  public myForm : FormGroup = this.fb.group({
    fullName:[ '' , [ Validators.required, Validators.minLength(3) ] ],
    sessions:[ ''],
    body:[''],
  })

  showModal(){
    this.modalService.open( AddPatientComponent, { size: 'lg'}).result.then( (result:any)=>{
      if ( result === 'success'){
        this.fetchPatients()
      }
    })
  }
  fetchPatients(){
    try {
      this.patientsService.fetchPatients({}).subscribe({
        next: (data) => {
          if ( data.patients ){
            data.patients.map( (p:any)=> p.dob=moment(p.dob).format('DD/MM/YYYY'))
            this.fetchedPatients=data.patients
            //this.patientForm.reset();
          } 
        },
        error: (e) => console.log(e)
      })  
    } catch (error) {
      console.log(error)
    }
  }

  patientDetail(id:any){
    this.router.navigate([`detalle/${id}`], { relativeTo: this.route.parent });
  }
}
