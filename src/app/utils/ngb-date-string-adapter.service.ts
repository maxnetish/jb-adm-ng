import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class NgbDateStringAdapterService extends NgbDateAdapter<string> {

    constructor() {
        super();
    }

    fromModel(value: string): NgbDateStruct {
        if (!value) {
            return undefined;
        }

        const dt = new Date(value);
        return {
            day: dt.getDate(),
            month: dt.getMonth() + 1,
            year: dt.getFullYear()
        };
    }

    toModel(date: NgbDateStruct): string {
        if (!date) {
            return undefined;
        }

        const dt = new Date(date.year, date.month - 1, date.day);
        return dt.toISOString();
    }
}
