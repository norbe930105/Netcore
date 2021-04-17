import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as env from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit{
  filtro = '';
  reserv: FormGroup;
  name = new FormControl('');
  apiUrl = env.environment.api;
  ngOnInit(): void {
    this.name.valueChanges.pipe(
      debounceTime(600)
    ).subscribe((value: string) => {
      this.filtro = value;
      this.gotosearch();
    });
  }

  constructor(
    private fb: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _http: HttpClient,
    private snackBar: MatSnackBar
  ) {
// @ts-ignore
    this.reserv = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      birth: ['', Validators.compose([Validators.required])],
      phone: ['']
    });
  }
  // tslint:disable-next-line:typedef
  gotosearch() {
    this.reserv.setValue({name: this.filtro, type: '', phone: '', birth: ''});
    let body: any;
    body = null;
    let parms = {
      name: this.filtro,
    };
    this._http.post(`${this.apiUrl}/person/find`, body, {params: parms})
      .subscribe((data1: any) => {
        if (data1.name !== null) {
          let nomb: string;
          nomb = data1.descriptions[0].type;
          this.reserv.setValue({name: data1.name, type: nomb, phone: data1.phone, birth: data1.birthDate});
          this.openSnackBar('Contacto Existente', 'X');
        }
      });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  reservar({name, type, phone, birth}): void{
    let body: any;
    let date: any;
    date = moment(birth).format('MM/DD/yyyy');
    body = null;
    let parms = {
      name: this.filtro,
      type,
      phone,
      date
    };
    this._http.post(`${this.apiUrl}/person/create`, body, {params: parms})
      .subscribe((data1: any) => {
        this.reserv.setValue({name: this.filtro, type: '', phone: '', birth: ''});
        this.openSnackBar('Contacto creado', 'X');
      });
  }
}


