import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Member } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  private _tableHeader: string[] = ['Nombre(s)', 'Apellido(s)', 'Teléfono', 'Email'];
  private _workbook!: Workbook;
  private _memberList: Member[]=[
    {
     firstName: 'Harijan',
     lastName: 'Fernández',
     mobile: '939056445',
     email: 'har.fernandez@hotmail.com',
     address:'parque hornopirén norte 8940',
     id: 1,
     state: true,
    },
    {
     firstName: 'Anais',
     lastName: 'Griott',
     mobile: '930292938',
     email: 'har.fernandez@hotmail.com',
     address:'Esperanza 349',
     id: 2,
     state: true
    },
    {
     firstName: 'Cocoliso',
     lastName: 'Duran',
     mobile: '939056445',
     email: 'har.fernandez@hotmail.com',
     address:'Lucrecia Valdés 359',
     id: 3,
     state: false
    },
   ]
  
  constructor() { }

  downloadExcel(dataExcel:any):void{
    this._workbook = new Workbook();
    this._createTable();
    this._workbook.xlsx.writeBuffer().then(( data ) => {
      const blob = new Blob([ data ]);
      fs.saveAs(blob, 'listaSocios.xlsx')
    })
  }

  private _createTable():void{
    const sheet = this._workbook.addWorksheet('socios');
    const headerRow = sheet.getRow(1)
    headerRow.values = this._tableHeader;
    for (let i = 0; i < this._tableHeader.length-1; i++){
      let column = sheet.getColumn(i+1);
      column.width = 30;
    }
    for (let i = 1; i <= this._memberList.length; i++){
      const row = sheet.getRow(i+1);
      row.values = Object.values(this._memberList[i-1]);
      console.log(Object.values(this._memberList[i-1]))
      console.log(row.values)
    } 
  }
}
