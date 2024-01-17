import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {

  transform(birthDate: any): number {
    let dob = this.convertStringToDate( birthDate )
    console.log(dob)
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }
  
    return age;
  }
  convertStringToDate(dateString:string) {
    const [month, day, year] = dateString.split('/').map(Number);
    const jsMonth = month - 1;
    const convertedDate = new Date(year, jsMonth, day);
    return convertedDate;
  }
}
