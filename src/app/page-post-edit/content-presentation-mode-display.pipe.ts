import {Pipe, PipeTransform} from '@angular/core';
import {ContentPresentationMode} from './content-presentation-mode.enum';

@Pipe({
    name: 'contentPresentationModeDisplay'
})
export class ContentPresentationModeDisplayPipe implements PipeTransform {

    private contentPresentationModeMap: { [key: string]: string; } = {
        [ContentPresentationMode.EDIT]: 'Edit',
        [ContentPresentationMode.PREVIEW]: 'Preview'
    };

    transform(value: ContentPresentationMode, args?: any): string {
        return this.contentPresentationModeMap[value] || value;
    }

}
