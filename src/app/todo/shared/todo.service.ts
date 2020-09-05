import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: AngularFireList<any>;

  constructor(
    private firebaseDB:AngularFireDatabase
  ) { }

  // A function that gets the todoList
  getTodo(){
    this.todoList = this.firebaseDB.list('titles');
    return this.todoList;
  }


  // A function that adds a todoList item
  addTodo(title: string) {
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }


  // A function that checks the todo item
  todoStatus($key: string, flag:boolean){
    this.todoList.update($key, {isChecked: flag});
  }


  // A function that removes the todo item
  removeTodo($key: string) {
    this.todoList.remove($key);
  }
}
