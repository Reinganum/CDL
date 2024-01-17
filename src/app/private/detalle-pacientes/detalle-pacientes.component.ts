import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'inspector';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { EditSessionComponent } from 'src/app/modals/edit-session/edit-session.component';
import { PacientesService } from 'src/app/public/services/pacientes.service';
import * as jspdf from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SessionService } from 'src/app/public/services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-pacientes',
  templateUrl: './detalle-pacientes.component.html',
  styleUrls: ['./detalle-pacientes.component.css']
})
export class DetallePacientesComponent implements OnInit{
  public fb = inject( FormBuilder )
  private modalService = inject( NgbModal )
  private id!:any;
  private route = inject( ActivatedRoute )
  public patientsService = inject( PacientesService )
  public sessionService = inject( SessionService )
  public patient!:any
  public caregiver!:any
  public sessions!:any[]
  public hideSessionPanel:boolean=false;
  
  public expandedSessionId: number | null = null;
  public myForm : FormGroup = this.fb.group({
    attendantName:[ 'teacher' , [ Validators.required, Validators.minLength(3) ] ],
    attendantLastname:[ 'adolfo' , [ Validators.required, Validators.minLength(3) ] ],
    sessions:[''],
    date:[''],
    content:['eat turkey'],
    fee: [''],
  })
  
  private toastr = inject( ToastrService )

  constructor(){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      this.patientsService.getPatientById(this.id).subscribe({
        next: (data:any)=>{
          data.dob=moment(data.dob).format('DD/MM/YYYY')
          this.patient=data
          this.myForm.controls['sessions'].setValue(this.patient.sessions.length + 1)
          this.caregiver=this.patient.caregiver[0]
          this.getPatientSessions()
        }
      })
    });
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

  deleteSession(i:number){
    const modalRef = this.modalService.open( ConfirmationComponent, { size: 'md' })
    modalRef.componentInstance.index = i;
    modalRef.result.then((res:any)=>{
      if (res){
        console.log(res)
        this.patient!.sessions.splice(res.index,1)
      }
    })
  }

  editSession(session:Session, i:Number){
    const modalRef = this.modalService.open( EditSessionComponent, { size: 'lg' })
    modalRef.componentInstance.session = {session, index: i};
    modalRef.result.then((res:any)=>{
      if (res){
        console.log(res)
        this.patient!.sessions[res.index].abstract=res.session.body
      }
    })
  }

  toggleExpand(sessionId: number): void {
    console.log(sessionId)
    if (this.expandedSessionId === null) {
      this.expandedSessionId = sessionId
    } else if ( this.expandedSessionId === sessionId) {
      this.expandedSessionId = null
    } else {
      this.expandedSessionId = sessionId
    }
  }

  download(patient:string, session:string, index:number){
    const pdf = new jspdf.jsPDF();
    // You can customize the PDF content here
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 10;
    let currentY = margin;
    const lines = pdf.splitTextToSize(session, pdf.internal.pageSize.width - 2 * margin);
    const lineHeight = 10;
    currentY += lines.length * lineHeight;
    if (currentY + lines.length * lineHeight > pageHeight - margin) {
      pdf.addPage();
      currentY = margin;
    }
    pdf.text(lines, margin, currentY);

    // Save the PDF
    pdf.save(`${patient}-${index}.pdf`);
  }

  print(patient:string, session:string, index:number){
    const pdf = new jspdf.jsPDF();
    // You can customize the PDF content here
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 10;
    let currentY = margin;
    const lines = pdf.splitTextToSize(session, pdf.internal.pageSize.width - 2 * margin);
    const lineHeight = 10;
    currentY += lines.length * lineHeight;
    if (currentY + lines.length * lineHeight > pageHeight - margin) {
      pdf.addPage();
      currentY = margin;
    }
    pdf.autoPrint({variant: 'non-conform'});
    pdf.save(`${patient}-${index}.pdf`);
  }

  saveSession(){
    this.sessionService.saveSession(this.id, this.myForm.value ).subscribe({
      next: (data) => {
        console.log(data)
        //this.patientForm.reset();
      },
      error: (e) => console.log(e)
    }) 
  }

  getPatientSessions(){
    try {
      this.sessionService.getPatientSessions(this.id).subscribe({
        next: (data) => {
          this.sessions=data.sessions
        },
        error: (e) => console.log(e)
      }) 
    } catch (error) {
      
    }
  }

  hidePanel(){
    console.log(this.hideSessionPanel)
    this.hideSessionPanel=!this.hideSessionPanel
  }
}
