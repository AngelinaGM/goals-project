import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Goal, Status } from './goal.model';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class GoalsService {
    goalsChanged = new Subject<Goal[]>();

    private goals: Goal[] = [];

    constructor(private http: Http) {
        this.fetchGoals();
    }

    getGoals() {
        return this.goals.slice();
    }

    fetchGoals() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/goals', {headers: headers})
            .subscribe((response: Response) => {
                const goals = response.json();
                console.log('Fetch goals: ', goals);
                for (let responseItem of response.json()['goals']) {
                    let goal = new Goal(responseItem['text'], responseItem['expiredDate'], responseItem['status']);
                    goal.setId(responseItem['_id']);
                    this.goals.push(goal);
                }
                this.goalsChanged.next(this.goals.slice());
            });
    }

    addGoal(newGoal: Goal) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/goals/add', newGoal, {headers: headers})
            .map(res => {
                this.goals.push(newGoal);
                this.goalsChanged.next(this.goals.slice());
                return res.json();
            });
    }

    updateGoalStatus(id: string, newStatus: Status) {
        console.log(id);
        // get goal by id
        for (let goal of this.goals) {
            if (goal.getId() === id) {
                let newGoal = new Goal(goal.text, goal.expiredDate, newStatus);
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                return this.http.post('http://localhost:3000/goals/goal/edit/' + id, newGoal, {headers: headers})
                    .map(res => {
                        console.log('Response after update status: ', res.json());
                        console.log('goals in service: ', this.goals);
                        return res.json();
                    });
            }
        }
    }
}
