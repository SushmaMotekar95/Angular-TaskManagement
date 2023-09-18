import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './emloyee.model';
import { status } from './status';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  totalRecords:any;
  page:number=1;
  searchText = '';
  formvalue!:FormGroup;
  Obj: EmployeeModel=new EmployeeModel();
  taskData !:any;
  showAdd!: boolean;
  showUpdate!:boolean;
  id=true;
  status1=status;
  statusvalue: string="";


  //inject to task service & formbulider
  constructor(private taskService: TodoService, private formbulider: FormBuilder) { }
  
  ngOnInit(): void {
      this.formvalue=this.formbulider.group({
      title:['',Validators.required],
      dueDate:[''],
      status:[''],
      
    })
    this.getAllTask();
  }

  changeStatus(e:any){
    this.statusvalue=e.target.value;
  }

  clickAddTask(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
 
  //create task method
  createTask(){
    {
     
      this.Obj.title=this.formvalue.value.title;
      this.Obj.dueDate=this.formvalue.value.dueDate;
      this.Obj.status=this.statusvalue;
    }
        this.taskService.create(this.Obj).subscribe(res => {
        //console.log('todo create',res);
        localStorage.setItem(res.id,JSON.stringify(res));
        alert(`Task ${this.Obj.title} Added Successfully`);
        let ref=document.getElementById('cancel');
        ref.click();
        this.formvalue.reset();
        this.getAllTask();
    })

  }
  
  //All Task Data
  getAllTask(){
    this.taskService.list().subscribe(res=>{
      //console.log('get all todos',res);
      this.taskData=res;
      this.totalRecords=this.taskData.length;
      
    })
  }

  //Edit value method
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.Obj.id=row.id;

    this.formvalue.controls['title'].setValue(row.title);
    this.formvalue.controls['dueDate'].setValue(row.dueDate);
    this.formvalue.controls['status'].setValue(row.statusValue);

  
  }

  //update task Method
  updateTask(){
    {
      this.Obj.title=this.formvalue.value.title;
      this.Obj.dueDate=this.formvalue.value.dueDate;
      this.Obj.status=this.statusvalue;
    }
        this.taskService.update(this.Obj.id,this.Obj).subscribe(res=>{
        //upadate data in local storage
        localStorage.setItem(res.id,JSON.stringify(res));
        //console.log('todo updated');
        alert(`Task ${this.Obj.title} Record Updated`);
        let ref=document.getElementById('cancel');
        ref.click();
        this.formvalue.reset();
        this.getAllTask();
      })     
  }

  deleteTask(row:any){
     this.taskService.deleteTodo(row.id).subscribe(res => {
      //console.log('todo deleted',res);
      // alert(`Task ${row.title} Record deleted`);
      confirm(`Task ${row.title} Record deleted`);
      //Remove data form local Storage
      localStorage.removeItem(row.id);
      this.getAllTask();
    })
    
  }
}
