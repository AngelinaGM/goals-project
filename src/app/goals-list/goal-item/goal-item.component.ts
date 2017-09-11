import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Goal, Status } from '../../shared/goal.model';
import { DatePipe } from '@angular/common';
import { Http, Response } from '@angular/http';
import { GoalsService } from '../../shared/goals.service';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css']
})
export class GoalItemComponent implements OnInit {
  @Input() goal: Goal;
  // @Input() index: number;

  // @Output() goalDoneClicked = new EventEmitter<string>();
  // @Output() goalFailedClicked = new EventEmitter<string>();

  ngOnInit() {
  }

  constructor(private http: Http, private goalsService: GoalsService) {}

  doneClick() {
    this.goal.changeStatus(Status.DONE);
    this.goalsService.updateGoalStatus(this.goal.getId(), Status.DONE).subscribe(res => console.log(res.success));
    // this.goalDoneClicked.emit(this.goal.getId());
  }

  failClick() {
    this.goal.changeStatus(Status.FAILED);
    this.goalsService.updateGoalStatus(this.goal.getId(), Status.FAILED).subscribe(res => console.log(res.success));
    // this.goalFailedClicked.emit(this.goal.getId());
  }

  getBackColor() {
    switch ( +this.goal.getStatus() ) {
      case Status.INJEOPARDY:
        return '#FFFFC7';
      case Status.DONE:
        return '#D4FFD1';
      case Status.FAILED:
        return '#FCAFAF';
      case Status.OPEN:
        return '#FFFFFF';
    }
  }

  getDisabled() {
    switch ( +this.goal.getStatus() ) {
      case Status.DONE:
      case Status.FAILED:
        return true;
      default:
        return false;
    }
  }
}
