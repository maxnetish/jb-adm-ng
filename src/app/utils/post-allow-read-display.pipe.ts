import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {PostAllowRead} from '../resources/post/post-allow-read.enum';
import {CommonModule} from '@angular/common';

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

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PostAllowReadDisplayPipe,
    ],
    exports: [
        PostAllowReadDisplayPipe,
    ]
})
export class PostAllowReadDisplayModule {
}
