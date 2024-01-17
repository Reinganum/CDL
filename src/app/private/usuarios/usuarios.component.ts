import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { Member } from 'src/app/interfaces';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public memberList: Member[]=[
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
     state: true
    },
   ]

   public newRequests: Member[]=[
    {
     firstName: 'Tata',
     lastName: 'Barahona',
     mobile: '89019202',
     email: 'haruki@hotmail.com',
     address:'parque hornopirén norte 8940',
     id: 5,
     state: false,
    },
   ]

   userColumns: string[] = ['select', 'id', 'nombre', 'direccion', 'email', 'telefono',]
   newRequestColumns: string[] = ['select', 'id', 'nombre', 'direccion', 'email', 'telefono', 'archivo', 'state']
  
    showPaginatorOptions = false;

    length = 50;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];
 
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

    changePaginatorOptions():void{
      this.showPaginatorOptions = !this.showPaginatorOptions;
    }
  }


