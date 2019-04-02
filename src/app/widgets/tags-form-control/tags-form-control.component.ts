import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagService } from 'src/app/resources/tag/tag.service';
import { Observable } from 'rxjs';
import { JbTagSearchResponse } from 'src/app/resources/tag/jb-tag-search-response';
import { PostStatus } from 'src/app/resources/post/post-status.enum';
import { JbTagInfo } from 'src/app/resources/tag/jb-tag-info';

@Component({
    selector: 'jb-adm-tags-form-control',
    templateUrl: './tags-form-control.component.html',
    styleUrls: ['./tags-form-control.component.less'],
    // these required to register component as ValueAccessor
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagsFormControlComponent),
            multi: true
        }
    ],
    // try more light OnPush strategy
    // changes will detects if @Input changed
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsFormControlComponent implements ControlValueAccessor {

    private _registeredOnBlurHandler: (val?: any) => void;
    private _registeredOnChangeHandler: (val?: any) => void;
    tagsObservable: Observable<JbTagSearchResponse>;
    tagsFormControl: FormControl = new FormControl([]);

    tagsSelectAddTag(term: string): JbTagInfo {
        return {
            count: 0,
            url: null,
            tag: term
        };
    }

    onTagsSelectBlur(e) {
        if (this._registeredOnBlurHandler) {
            this._registeredOnBlurHandler();
        }
    }

    constructor(
        private tagService: TagService
    ) {
        this.tagsObservable = this.tagService.list({
            statuses: [PostStatus.PUB, PostStatus.DRAFT]
        });
        this.tagsFormControl.valueChanges
            .subscribe(val => {
                if (this._registeredOnChangeHandler) {
                    this._registeredOnChangeHandler(val);
                }
            });
    }

    registerOnChange(fn: any): void {
        this._registeredOnChangeHandler = fn;
    }

    registerOnTouched(fn: any): void {
        this._registeredOnBlurHandler = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // FIXME set disabled select
    }

    writeValue(obj: any): void {
        this.tagsFormControl.setValue(obj);
    }

}
