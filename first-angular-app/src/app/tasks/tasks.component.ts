import { Component, Input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task/task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;

  tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onStartAddNewTask() {
    this.isAddingTask = true;
  }

  onCancelAddNewTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: NewTaskData) {
    //// This does not satisfy Immutability
    // this.tasks.unshift({
    //   id: new Date().getTime().toString(),
    //   userId: this.userId,
    //   title: taskData.title,
    //   summary: taskData.summary,
    //   dueDate: taskData.date,
    // });

    // Immutability
    // Why Is This Better?
    // - No Direct Mutation: A new array is created by using the spread operator (...this.tasks), ensuring the original array remains unchanged.
    // - Change Detection: Angular’s change detection mechanism works better with immutable operations, as it can more easily detect changes when references are updated.
    
    // By satisfying immutability, your application becomes more predictable, and its state management aligns with best practices,
    // especially if you're using Angular features like OnPush change detection or a reactive state management library.
    
    this.tasks = [
      {
        id: new Date().getTime().toString(),
        userId: this.userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...this.tasks
    ];

    this.isAddingTask = false;
  }
}
