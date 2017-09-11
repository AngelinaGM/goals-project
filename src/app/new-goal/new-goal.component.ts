import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoalsService } from '../shared/goals.service';
import { Goal, Status } from '../shared/goal.model';
import { Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  newGoalForm: FormGroup;

  constructor(private goalsService: GoalsService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.newGoalForm = new FormGroup({
      'text': new FormControl('', Validators.required),
      'expDate': new FormControl('', [Validators.required, this.validDate])
    });
  }

  onSubmit() {
    let status = Status.OPEN;
    const date = new Date(this.newGoalForm.value['expDate']);
    const today = new Date();
    if ((date.getMonth() > today.getMonth()) && (today.getDate() - date.getDate() > 27) ) {
      status = Status.INJEOPARDY;
    }
    if (date.getMonth() === today.getMonth()) {
      if ( date.getDate() - today.getDate() < 4 ) {
        status = Status.INJEOPARDY;
      }
    }
    const newGoal: Goal = new Goal(
      this.newGoalForm.value['text'],
      date,
      status);
    console.log('New goal = ', newGoal);

    this.goalsService.addGoal(newGoal)
      .subscribe(
        (res) => {
        if (res.success) {
          this.flashMessages.show('Goal has been added', {cssClass: 'alert-success'});
          // this.router.navigate(['/login']);
        } else {
          this.flashMessages.show('Something went wrong', {cssClass: 'alert-danger'});
          // this.router.navigate(['/register']);
        }
      }
      );
  }

  validDate(control: FormControl): {[s: string]: boolean} {
    const today = new Date();
    const date = new Date(control.value);
    if (today.getFullYear() > date.getFullYear()) {
      return {'yearIsInThePast': true};
    }
    if (today.getMonth() > date.getMonth()) {
      return {'monthIsInThePast': true};
    } else if ( ( today.getMonth() === date.getMonth()) && (today.getDate() > date.getDate()) ) {
      return {'dayIsInThePast': true};
    }
    return null;
  }
}
