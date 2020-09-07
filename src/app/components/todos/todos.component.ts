import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  totalPages:number[] = [];

  perPage:number = 5;

  currentPage:number = 1;

  pageTodos:Todo[];

  todos:Todo[];

  constructor(private todoService:TodoService) { 
    
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.setTotalPages();
      this.getPageTodos();
    });
  }

  setTotalPages(){
    for(let i=1; i <= this.todos.length/this.perPage; i++){
      this.totalPages.push(i)
      console.log(this.totalPages)
    }
  }

  deleteTodo(todo:Todo){
    // Remove todo item from UI
    this.todos = this.todos.filter(t => t.id !== todo.id)

    // Remove from server
    this.todoService.deleteTodo(todo).subscribe(todo => console.log(todo));
    this.setTotalPages();
    this.getPageTodos();
  }

  getPageTodos(){
    const offset = (this.currentPage - 1) * this. perPage ;
    this.pageTodos = this.todos.slice(offset, offset+this.perPage);
  }

  addTodo(todo:Todo){
    // Add todo in server
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
      this.setTotalPages();
      this.getPageTodos();
    })
  }

  gotoPage(i:number){
    console.log(i)
    this.currentPage = i;
    this.getPageTodos();
  }

  gotoNext(){
    this.currentPage = this.currentPage + 1;
    this.getPageTodos();
  }

  gotoPrevious(){
    this.currentPage = this.currentPage - 1;
    this.getPageTodos();
  }
  
  // Set Dynamic Classes
  setClasses(i: number) {
    let classes = {
      i:true,
      'active': this.currentPage == i
    }
    return classes;
  }


}
