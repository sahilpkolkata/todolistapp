import { Component, OnInit } from '@angular/core';  

import { Todo } from "./todo";
import { TodoService } from "./todos.service";

@Component({
    selector:"app-todos",
    templateUrl:"./todos.component.html",
    providers: [TodoService]
})

export class TodosComponent implements OnInit {
    todos: Todo[];
    editTodo: Todo;

    constructor(private todoService: TodoService){}
        ngOnInit(){
            this.getTodos();
        }

        getTodos():void{
            this.todoService.getTodos().subscribe(todos => {this.todos = todos});
        }

        add(text:string):void{
            this.editTodo = undefined;
            text = text.trim();
            if(!text){
                return;
            }

          const newTodo: Todo = {text} as Todo
          this.todoService.addTodo(newTodo).subscribe(todo => this.todos.push(todo));
        }

        delete(todo:Todo):void{
            this.todos = this.todos.filter(h => h !== todo);
            this.todoService.deleteTodo(todo._id).subscribe();
        }

        edit(todo){
            this.editTodo = todo;
        }

        update(){
            if(this.editTodo){
                this.todoService.updateTodo(this.editTodo).subscribe(todo => {
                    const x = todo ? this.todos.findIndex(h=> h._id === todo._id): -1 ;
                    if(x>-1){
                        this.todos[x] = todo;
                    }
                });
                this.editTodo = undefined;
            }
        }

}