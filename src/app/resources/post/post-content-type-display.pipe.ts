import {Pipe, PipeTransform} from '@angular/core';
import {PostContentType} from './post-content-type.enum';

@Pipe({
    name: 'postContentTypeDisplay'
})
export class PostContentTypeDisplayPipe implements PipeTransform {

    private readonly contentTypeMap: { code: PostContentType, label: string }[] = [
        {
            code: PostContentType.MD,
            label: 'Markdown (MD)'
        },
        {
            code: PostContentType.HTML,
            label: 'HTML'
        }
    ];

    transform(value: any, args?: any): any {
        const ent = this.contentTypeMap.find(i => i.code === value);
        return ent ? ent.label : value;
    }

}
