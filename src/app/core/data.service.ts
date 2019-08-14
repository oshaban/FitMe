import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { AuthenticationService } from './authentication.service';
import { WeightsGetData } from '../interfaces/weightsRes';
import { WeightFormData } from '../interfaces/weightForm';

@Injectable()
export class DataService {

  // Endpoint for weights data
  private readonly API_URL = 'http://localhost:3500/api/weights/me/';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  /**
   * @param httpClient Used to perform http requests
   * @param auth Used to authenticate user
   */
  constructor(
    private httpClient: HttpClient,
    private auth: AuthenticationService,
    ) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /**
   * Gets all user weights from database
   */
  getAllIssues(): void {

    // Sets authorization token headers
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': `${this.auth.getToken()}`
      })
    };

    // Send GET request
    this.httpClient.get<WeightsGetData>(this.API_URL, httpOptions).subscribe(data => {
        this.dataChange.next(data.weight);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  /**
   * Adds a user weight to the database
   * @param weightItem User weight to add to database
   */
  addItem(weightItem: WeightFormData): void {

    // Sets authorization token headers
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': `${this.auth.getToken()}`
      })
    };

    // POST request
    this.httpClient.post<WeightsGetData>(this.API_URL, weightItem, httpOptions).subscribe(data => {
      this.dialogData = {name: weightItem.date, value: weightItem.weight};
      console.log(weightItem);
      // this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

  /**
   * Deletes a weight document from a users weight data
   * @param id Id of weight document
   */
  deleteItem(id: number): void {

    // DELETE request
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        // this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  updateIssue(issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue(id: number): void {
    console.log(id);
  }
}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/