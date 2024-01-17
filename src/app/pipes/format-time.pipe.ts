// time-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    const meridian = hours >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${meridian}`;
  }
}
