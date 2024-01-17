import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Patient, Session } from 'src/app/interfaces'
import { PacientesService } from '../../services/pacientes.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  private fb = inject( FormBuilder )
  private patientsService = inject( PacientesService )
  private sessionService = inject( SessionService )

  public sessions!:any[]
  public patients!:any[]
  public daysInWeek:any
  public myForm: FormGroup = this.fb.group({
    fecha: [''],
  })

  public selectedDate: Date = new Date();
  public months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  public weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo']
  public selectedActivity:any
  public weekOfYear!:number
  
  ngOnInit() {
    this.weekOfYear = this.getWeekNumber()
    this.fillDaysOfWeek()
    let minDate=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(), this.daysInWeek[0][1])
    this.getSessions(minDate)
  }

  onDragStart(activity:Patient){
    this.selectedActivity=activity
    console.log(activity)
  }

  onDrop(day:any){
   for (let i = 0; i < this.patients.length; i++){
    if ( this.patients[i].firstName === this.selectedActivity.firstName ) {
      this.patients[i].booking = day;
    }
   }

   this.selectedActivity=null
  }

  onDragOver(event:any){
    event.preventDefault() 
  }

  chooseDate(){
    this.selectedDate=this.myForm.value.fecha
    this.fillDaysOfWeek()
  }

  fillDaysOfWeek(): void {
    if (this.selectedDate) {
      const selectedDayOfWeek = this.weekDays[this.selectedDate.getDay()];
      this.daysInWeek = [...Array(7).keys()].map(offset => {
        const date = new Date(this.selectedDate);
        date.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + 1 + offset);
        return [date.getDate(), date.getMonth()+1];
      });
    }
  }

  getWeekNumber(date?:Date) {
    if(!date) return this.weekOfYear = moment(new Date()).isoWeek();
    return this.weekOfYear = moment(date).isoWeek();
  }

  addDays() {
    console.log(this.selectedDate)
    this.selectedDate = moment(this.selectedDate).add(6,'days').toDate()
    console.log(this.selectedDate)
    this.fillDaysOfWeek();
    
    this.weekOfYear = moment(this.selectedDate).isoWeek();
  }

  substractDays(){
    this.selectedDate = moment(this.selectedDate).subtract(7, 'days').toDate();
    this.fillDaysOfWeek()
    this.weekOfYear=moment(this.selectedDate).isoWeek()
    this.getSessions(this.selectedDate)
  }

  filterSessions(index:number){
    return this.sessions.filter((session)=>{
      const sessionDate = new Date(session.date)
      const sessionDay = sessionDate.getDay()
      const sessionHour = moment.utc(sessionDate).format('HH:mm')
      if ( sessionDay === index ){
        session.hour = sessionHour
        return session
      } 
    })
  }

  getSessions( minDate:any ){
    this.sessionService.getSessionsByDate(minDate).subscribe({
      next: (data) => {
        this.sessions=data
        console.log(data)
      },
      error: (e) => console.log(e)
    })
  }

}
