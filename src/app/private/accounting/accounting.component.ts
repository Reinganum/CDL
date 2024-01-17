import { Component, ViewChild, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;
 
  @ViewChild("donutChart") donutChart!: ChartComponent;
  public donutChartOptions: any;

  private fb = inject( FormBuilder )

  public fechasForm = this.fb.group({
    fechaInicio:[''],
    fechaFin: [''],
  })

  private months:string[]=["Ene", "Feb",  "Mar",  "Abr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", "Nov", "Dic"];
  public startDate:any = 0;
  public endDate:any = 12;
  public chartData:any = { xaxis: [], yaxis: [] }

  constructor() {
    console.log()
    this.donutChartOptions = {
      series: [44, 55, 13],
      chart: {
        type: "donut"
      },
      labels: ["Sesiones Paciente", "Sesiones Padres", "Sesiones Colegio"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions = {
      series: [
        {
          name: "Finanzas",
          data:[173, 275, 351]
        }
      ],
      chart: {
        height: 350,
        type: "area",
      },
      title: {
        text: "Ingreso mensual"
      },
      xaxis: {
        categories: [1, 2, 3]
      }
    };
  }

  seleccionarPeriodo(){
    this.chartData = { xaxis: [], yaxis: [] }
    this.startDate = this.fechasForm.controls['fechaInicio'].value
    this.endDate = this.fechasForm.controls['fechaFin'].value

    console.log(this.startDate, this.endDate)

    let currentDate =this.startDate

    while (currentDate <= this.endDate) {
      this.chartData.xaxis.push(`${new Date(currentDate).getDate()}/${new Date(currentDate).getMonth()+1}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.chartData.yaxis = this.chartData.xaxis.map(()=>{
      const randomNumber = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
      return randomNumber
    })
    this.chartOptions = {
      series: [
        {
          name: "Finanzas",
          data:this.chartData.yaxis
        }
      ],
      chart: {
        height: 350,
        type: "area",
      },
      title: {
        text: "Ingreso mensual"
      },
      xaxis: {
        categories: this.chartData.xaxis
      }
    };
  }
}