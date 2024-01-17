import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/interfaces';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit{
  @Input() session!: any;

  private fb = inject( FormBuilder ) 

  public activeModal = inject ( NgbActiveModal )
  
  public editForm = this.fb.group({
    body:[''],
    sessions:[''],
    fullName:[''],
  })

  ngOnInit(): void {
    this.editForm.controls['body'].setValue(this.session.session.abstract)  
  }

  saveAndClose(){
    this.activeModal.close( {session: this.editForm.value, index: this.session.index})
  }

}
