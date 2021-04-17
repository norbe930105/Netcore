import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as env from '../../../../environments/environment';
import {debounceTime} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit{
  id: any;
  reserv: FormGroup;
  apiUrl = env.environment.api;
  constructor(
    private fb: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _http: HttpClient,
    private snackBar: MatSnackBar,
    // tslint:disable-next-line:variable-name
    private _ac: ActivatedRoute,
  ) {
// @ts-ignore
    this.reserv = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      birth: ['', Validators.compose([Validators.required])],
      phone: ['']
    });
  }
  ngOnInit(): void {
    this.loadreserv();
  }
  // tslint:disable-next-line:typedef
  loadreserv() {
    let id: any;
    let body: any;
    body = null;
    this._ac.paramMap.subscribe(params => {
      id = params.get('id');
      this.id = id;
    });
    let parms = {
      id
    };
    this._http.post(`${this.apiUrl}/person/getperson`, body, {params: parms})
      .subscribe((data1: any) => {
        if (data1.name !== null) {
          let nomb: string;
          nomb = data1.descriptions[0].type;
          this.reserv.setValue({name: data1.name, type: nomb, phone: data1.phone, birth: data1.birthDate});
        }
      });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  // @ts-ignore
  editreserva({name, type, phone, birth}): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    let body: any;
    let date: any;
    date = moment(birth).format('MM/DD/yyyy');
    body = null;
    let parms = {
      id: this.id,
      name,
      type,
      phone,
      date
    };
    this._http.post(`${this.apiUrl}/person/edit`, body, {params: parms})
      .subscribe((data1: any) => {
        this.openSnackBar('Contacto editado', 'X');
        this._router.navigate(['']);
      });
  }
}



