import {Pipe, PipeTransform} from '@angular/core';
import {PostAllowRead} from './post-allow-read.enum';

@Pipe({
    name: 'postAllowReadDisplay'
})
export class PostAllowReadDisplayPipe implements PipeTransform {

    private postAllowReadMap: { [key: string]: string; } = {
        [PostAllowRead.FOR_ALL]: 'All',
        [PostAllowRead.FOR_ME]: 'Only I',
        [PostAllowRead.FOR_REGISTERED]: 'Authenticated users'
    };

    transform(value: PostAllowRead): string {
        return this.postAllowReadMap[value] || value;
    }

}
