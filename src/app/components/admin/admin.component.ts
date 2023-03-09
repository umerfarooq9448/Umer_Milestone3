import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/Models/EmployeeModel';
import { ApiserviceService } from 'src/app/services/apiservice.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //this is used for validation of forms
  name = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  country = new FormControl('', [Validators.required]);

  employeeList:any=[]
  employee={
        "id": 0,
        "Name": "",
        "Address":"",
        "Phone": 0,
        "Country":""
  }
  tempemp={
    
      "id": 0,
      "Name": "",
      "Address":"",
      "Phone": 0,
      "Country":""

  }


  //this is the material ui template used for pagination, table , sort,
  public dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[]=['id',"Name","Address", "Phone","Country","Operations"]


  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private apiservice:ApiserviceService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  //this is the method to get all the employees using the service
  getAllEmployees(){
    this.apiservice.getAllEmployees().subscribe((resp)=>{
      console.log(resp);
      this.employeeList = resp
      this.dataSource = new MatTableDataSource(this.employeeList)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      
    },(error:HttpErrorResponse)=>{
      console.error(error)
    })
  }

  //this is the method to add a new Employee using the service
  addEmployee(){
      this.apiservice.addEmployee(this.employee).subscribe((resp)=>{
        console.log(resp)
        this.getAllEmployees()
        
      },(error:HttpErrorResponse)=>{
        console.error(error)
      }
      )
  }

  //this is the method to delete an employee using id using the service
  deleteEmployee(emp:Employee){
    console.log(emp.id)
    this.apiservice.deleteEmployee(emp.id).subscribe((resp)=>{
      console.log(resp)
      this.getAllEmployees()
    },(err:HttpErrorResponse)=>
    {
      console.error(err)
    })
  }


  //this is the method to update an employee using id using the service
  updateEmployee(){
    this.apiservice.updateEmployee(this.tempemp.id,this.employee).subscribe((resp)=>{
      console.log(resp)
      this.getAllEmployees()
    },(err:HttpErrorResponse)=>{
      console.error(err)
    })
  }


  //this method is used to get the id to be updated and is globally assigned and used by update method
  getEmployee(emp:Employee){
    this.tempemp = emp
  }


  // this is the template code to apply filters
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  //this is the method to show error message for validations
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.address.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.country.hasError('required')) {
      return 'You must enter a value';
    }
    
    return "Enter a value"
    
  }




}
