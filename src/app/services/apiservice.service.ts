import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  baseUrl="http://localhost:3000/Employee/"

  myHeaders = new HttpHeaders().set("authKey","value");
  constructor(private httpclient:HttpClient) { }

  //implementing service method to get the list of all the employees
  getAllEmployees():Observable<Employee[]>{
    debugger;
   return this.httpclient.get<Employee[]>(this.baseUrl,{headers:this.myHeaders})
  }
  //implementing service method to add new employee
  addEmployee(emp:Employee):Observable<Employee[]>{
    return this.httpclient.post<Employee[]>(this.baseUrl,emp)
  }
  //implementing service method to delete an employee with his id
  deleteEmployee(id:number){
    return this.httpclient.delete(this.baseUrl+id)
  }
  //implementing service method to update an employee
  updateEmployee(id:number,emp:Employee){
    return this.httpclient.put(this.baseUrl+id,emp)
  }

}
