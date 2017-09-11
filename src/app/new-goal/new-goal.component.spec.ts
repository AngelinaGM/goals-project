import { TestBed, async } from '@angular/core/testing';
import { NewGoalComponent } from './new-goal.component';

describe('Component: New Goal', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NewGoalComponent]
        });
    });

    it('should create the app', () => {
        let fixture = TestBed.createComponent(NewGoalComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
