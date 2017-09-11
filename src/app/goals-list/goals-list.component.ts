import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Goal, Status } from '../shared/goal.model';
import { GoalsService } from '../shared/goals.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent implements OnInit, OnDestroy {
  goals: Goal[];
  subscription: Subscription;

  constructor(private goalsService: GoalsService) { }

  ngOnInit() {
    this.subscription = this.goalsService.goalsChanged.subscribe(
      (goals: Goal[]) => {
        this.goals = goals;
      }
    );
    this.goals = this.goalsService.getGoals();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
