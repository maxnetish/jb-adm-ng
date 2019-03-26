import {Pipe, PipeTransform} from '@angular/core';
import {PostStatus} from './post-status.enum';

@Pipe({
    name: 'postStatusDisplay'
})
export class PostStatusDisplayPipe implements PipeTransform {

    private readonly statusMap: { code: PostStatus, label: string }[] = [
        {
            code: PostStatus.DRAFT,
            label: 'Draft'
        },
        {
            code: PostStatus.PUB,
            label: 'Published'
        }
    ];

    transform(value: PostStatus, ...restArgs: any[]): string {
        const ent = this.statusMap.find(i => i.code === value);
        return ent ? ent.label : value;
    }

}
