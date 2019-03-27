import {Pipe, PipeTransform} from '@angular/core';
import {Converter} from 'showdown';
import {PostContentType} from '../resources/post/post-content-type.enum';

@Pipe({
    name: 'postContentPreview'
})
export class PostContentPreviewPipe implements PipeTransform {

    private showdownConverter = new Converter({
        strikethrough: true,
        // encodeEmails: true,
        openLinksInNewWindow: true,
        backslashEscapesHTMLTags: false,
        emoji: true
    });

    transform(value: string, mode: PostContentType = PostContentType.MD): string {
        if (!value) {
            return value;
        }

        switch (mode) {
            case PostContentType.MD:
                return this.showdownConverter.makeHtml(value);
            default:
                return value;
        }
    }

}
