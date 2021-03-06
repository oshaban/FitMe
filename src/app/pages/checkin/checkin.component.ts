import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataSource } from '@angular/cdk/collections';

import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/core/data.service';
import { AddDialogComponent } from 'src/app/dialogs/add/add.dialog.component';
import { EditDialogComponent } from 'src/app/dialogs/edit/edit.dialog.component';
import { Issue } from 'src/app/interfaces/issue';
import { DeleteDialogComponent } from 'src/app/dialogs/delete/delete.dialog.component';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { MatSnackBar } from '@angular/material';

/** Datasource for table */
export class ExampleDataSource extends DataSource<Issue> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public exampleDatabase: DataService,
              public paginator: MatPaginator,
              public sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];

    this.exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this.exampleDatabase.data;

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'value': [propertyA, propertyB] = [a.value, b.value]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
} // END class ExampleDataSource


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})

export class CheckInComponent implements OnInit {

  /** Columns to display in table  */
  displayedColumns = ['value', 'name', 'actions'];

  exampleDatabase: DataService | null;

  /** dataSource for table  */
  dataSource: ExampleDataSource | null;

  index: number;
  id: string;


  /**
   * @param httpClient Sends HTTP requets
   * @param dialog Dialog box for adding, modifying, and deleting weights
   * @param dataService Fetches data from dialog boxes
   * @param auth Used to authenticate user
   */
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService,
              public auth: AuthenticationService,
              public toasterservice: MatSnackBar
              ) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  /** Adds a new weight {weight:.., date:...,} to database */
  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());

        // console.log(this.dataService.getDialogData());

        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: string, value: number, name: string) {
    this.index = i;
    this.id = id;

    const dialogRef = this.dialog.open(EditDialogComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      data: {id: id, value: value, name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        // Find index of row table being edited
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => {
            return x._id === this.id;
        });

        /* console.log(  this.dataService.getDialogData() ); */
        /* This returns {_id:.., name:.., value:...} */

        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();

        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  /** Deletes a weight from the database */
  deleteItem(i: number, id: string, value: number, name: string) {
    this.index = i;
    this.id = id;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // tslint:disable-next-line: object-literal-shorthand
      data: {id: id, value: value, name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => {
            return x._id === this.id;
        });

        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  /** Refreshes data for table  */
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Load data for table  */
  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient, this.auth, this.toasterservice); // Service to fetch data
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort); // Create new data source for table
    // console.log(this.dataSource); // Weight data from database: {_id:..,value:...,name:...}

  }
} // END CheckInComponent

