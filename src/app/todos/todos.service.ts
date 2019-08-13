import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Todo } from './todo';

@Injectable()
export class TodoService {
    
    constructor(private http:HttpClient){}

    public getTodos():Observable<Todo[]>{
        return this.http.get<Todo[]>("api/todos")
    }

    public addTodo(todo:Todo):Observable<Todo>{
        return this.http.post<Todo>("api/todos",todo)
    }

    public deleteTodo(id:number):Observable<{}>{
        const url = `api/todos/${id}`;
        return this.http.delete(url)
    }

    public updateTodo(todo:Todo):Observable<Todo>{
        return this.http.put<Todo>(`api/todos/${todo._id}`,todo)
    }
}
