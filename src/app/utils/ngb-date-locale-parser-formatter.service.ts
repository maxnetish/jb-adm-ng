import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class NgbDateLocaleParserFormatterService extends NgbDateParserFormatter {

    constructor() {
        super();
    }

    format(date: NgbDateStruct): string {
        if (!date) {
            return '';
        }

        const dt = new Date(date.year, date.month - 1, date.day);
        return dt.toLocaleDateString();
    }

    parse(value: string): NgbDateStruct {
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
}
