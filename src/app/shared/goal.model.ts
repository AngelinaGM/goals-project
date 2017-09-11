export enum Status {
    OPEN,
    INJEOPARDY,
    DONE,
    FAILED
}

export class Goal {
    private id: string;

    constructor(public text: string, public expiredDate: Date, public status: Status) { }

    createGoal(text: string, status: Status) {
        this.text = text; this.status = status;
        this.expiredDate = new Date();
    }

    getStatus() {
        return this.status;
    }

    setId(id: string) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    changeStatus(newStatus: Status) {
        this.status = newStatus;
    }
}
