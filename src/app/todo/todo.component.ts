import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoListArray: any[];

  constructor(
    private tdServ: TodoService
  ) { }

  ngOnInit(): void {
    this.tdServ.getTodo().snapshotChanges()
      .subscribe(item => {
        this.todoListArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.todoListArray.push(x);
        })

        // Sorting of the list if isCheck is from false to true
        this.todoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
  }


  // Function that adds a todo item with the help of TodoService
  onAdd(itemTitle) {
    this.tdServ.addTodo(itemTitle.value);
    itemTitle.value = null;
  }

  // Function that checks a todo item with the help of TodoService
  checkTodo($key: string, isChecked: boolean){
    this.tdServ.todoStatus($key, !isChecked);
  }


  // Function that deletes a todo item with the help of TodoService
  delTodo($key: string) {
    this.tdServ.removeTodo($key);
  }

}
