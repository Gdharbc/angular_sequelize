import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXN0b21lciI6eyJpZCI6MSwiZmlyc3RuYW1lIjoiZ2FuZ2EiLCJsYXN0bmFtZSI6ImJjIiwiYWdlIjozMCwiZW1haWwiOiJnYW5nYUBnYW5nYS5jb20iLCJwYXNzd29yZCI6ImdhbmdhIiwiY3JlYXRlZEF0IjoiMjAxMC0wMS0wMVQwMDowMDowMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAxMC0wMS0wMVQwMDowMDowMC4wMDBaIn0sImlhdCI6MTU3MDU1Mzc4N30.m25euksv8lQ8mqhG_jWF__N8cm-rICTXo5ftqOsnp0E' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:8080/api/customers';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }
  

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  addCustomer (customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
  }

  deleteCustomer (customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions);
  }

  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
}