import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as env from '../../../../environments/environment';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  length = 0;
  filtro = '';
  // tslint:disable-next-line:variable-name
  page_size = 3;
  // tslint:disable-next-line:variable-name
  page_number = 1;
  sort = new FormControl('');
  apiUrl = env.environment.api;
  constructor(
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.sort.valueChanges.pipe(
    ).subscribe(value => {
      this.filtro = value;
      this.searchapi();
    });
    this.reserv();
  }
  // tslint:disable-next-line:typedef
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  // tslint:disable-next-line:typedef
  reserv() {
    let date: string;
    let newdate: string;
    let arr: any[];
    this._http.get(`${this.apiUrl}/reservation`, {responseType: 'json'})
      .subscribe((data1: any) => {
        arr = data1;
        this.length = arr.length;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < arr.length; i++) {
          date = arr[i].date;
          newdate = moment(date).format('LLLL');
          arr[i].date = newdate;
          arr[i].star = [];
          arr[i].nostar = [];
          if (arr[i].rate < 5) {
            let nostar = 5 - arr[i].rate;
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < arr[i].rate; k++) {
              arr[i].star.push(k);
            }
            for (let x = 0; x < nostar; x++) {
              arr[i].nostar.push(x);
            }
          } else {
            for (let w = 0; w < arr[i].rate; w++) {
              arr[i].star.push(w);
            }
          }
        }
        this.data = arr;
      });
  }
  // tslint:disable-next-line:typedef
  addfavorite(id1: number) {
    let body: any;
    body = null;
    let parms = { id: id1.toString()};
    this._http.post(`${this.apiUrl}/reservation/favorite`, body, {params: parms})
      .subscribe((data: any) => {
       this.reserv();
      });
  }
  // tslint:disable-next-line:typedef
  searchapi() {
    let body: any;
    body = null;
    let date: string;
    let newdate: string;
    let arr: any[];
    let parms = { filtro: this.filtro};
    this._http.post(`${this.apiUrl}/reservation/orderby`, body, {params: parms})
      .subscribe((data: any) => {
        arr = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < arr.length; i++) {
          date = arr[i].date;
          newdate = moment(date).format('LLLL');
          arr[i].date = newdate;
          arr[i].star = [];
          arr[i].nostar = [];
          if (arr[i].rate < 5) {
            let nostar = 5 - arr[i].rate;
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < arr[i].rate; k++) {
              arr[i].star.push(k);
            }
            for (let x = 0; x < nostar; x++) {
              arr[i].nostar.push(x);
            }
          } else {
            for (let w = 0; w < arr[i].rate; w++) {
              arr[i].star.push(w);
            }
          }
        }
        this.data = arr;
      });
  }
  // tslint:disable-next-line:typedef
  gotoedit(id: number) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this._router.navigate(['edit', id]);
  }

}
