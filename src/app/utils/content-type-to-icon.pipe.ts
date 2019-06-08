import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CommonModule} from '@angular/common';

@Pipe({
    name: 'contentTypeToIcon'
})
export class ContentTypeToIconPipe implements PipeTransform {

    icons: Array<{ contentType: RegExp; icon: string }> = [
        {
            contentType: /image/,
            icon: 'fa-file-image'
        },
        {
            contentType: /msword/,
            icon: 'fa-file-word'
        },
        {
            contentType: /video/,
            icon: 'fa-file-video'
        },
        {
            contentType: /pdf/,
            icon: 'fa-file-pdf'
        },
        {
            contentType: /excel/,
            icon: 'fa-file-excel'
        },
        {
            contentType: /csv/,
            icon: 'fa-file-csv'
        },
        {
            contentType: /audio/,
            icon: 'fa-file-audio'
        },
        {
            contentType: /archive/,
            icon: 'fa-file-archive'
        },
        {
            contentType: /text/,
            icon: 'fa-file-alt'
        }
    ];

    defaultIcon = 'fa-file';
    iconCommonClass = 'fas';

    transform(contentType?: string): string {
        contentType = contentType || 'UNKNOWN';
        const found = this.icons.find(m => !!contentType.match(m.contentType));
        if (found) {
            return `${this.iconCommonClass} ${found.icon}`;
        }
        return `${this.iconCommonClass} ${this.defaultIcon}`;
    }

}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ContentTypeToIconPipe,
    ],
    exports: [
        ContentTypeToIconPipe,
    ]
})
export class ContentTypeToIconModule {
}
