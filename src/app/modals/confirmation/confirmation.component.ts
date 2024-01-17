import { Component, Input, inject,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  public activeModal = inject ( NgbActiveModal )
  @Input() index!: number;

  confirm(){
    this.activeModal.close({ index:this.index })
  }

  cancel(){
    this.activeModal.close('')
  }
}
