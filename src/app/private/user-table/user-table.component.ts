import {SelectionModel} from '@angular/cdk/collections';
import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { Member } from 'src/app/interfaces';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

@Input() memberList!:Member[]
@Input() columns!:string[]

public dataSource!:MatTableDataSource<Member>
private _displayedColumns!: string[]
public accesoUsuario:boolean=false

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Member>( this.memberList );
    this._displayedColumns = this.columns
  }

  /**
   * @title Table with selection
   */


  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }
  public set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }
    selection = new SelectionModel<Member>(true, []);
    showPaginatorOptions = false;
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Member): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

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


