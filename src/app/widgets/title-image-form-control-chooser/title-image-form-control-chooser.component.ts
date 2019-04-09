import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Optional,
    Self
} from '@angular/core';
import {JbFileInfo} from '../../resources/file/jb-file-info';
import {AvatarImageAddModal} from '../avatar-image-add/avatar-image-add.component';
import {FileStoreService} from '../../resources/file/file-store.service';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'jb-adm-title-image-form-chooser',
    templateUrl: './title-image-form-control-chooser.component.html',
    styleUrls: ['./title-image-form-control-chooser.component.less'],
    // these required to register component as ValueAccessor
    // See https://material.angular.io/guide/creating-a-custom-form-field-control#-code-ngcontrol-code-
    providers: [
        // {
        //     provide: NG_VALUE_ACCESSOR,
        //     useExisting: forwardRef(() => TitleImageFormControlChooserComponent),
        //     multi: true
        // },
        {
            provide: MatFormFieldControl,
            useExisting: TitleImageFormControlChooserComponent,
        },
    ],
    // try more light OnPush strategy
    // changes will detects if @Input changed
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleImageFormControlChooserComponent implements OnInit, ControlValueAccessor, MatFormFieldControl<JbFileInfo>, OnDestroy {

    static nextId = 0;

    private _touchedListener: (val?: any) => void;
    private _titleImagesItemsPerPage = 5;
    private _titleImageSelectOpenedOnce = false;
    private _titleImagesHasMore = true;
    private _titleImagesLoadedPage = 0;
    titleImagesLoading = false;
    titleImages: Array<JbFileInfo> = [];
    titleImageSelectFormControl: FormControl = new FormControl();

    /**
     * implementation of MatFormFieldControl
     */
    readonly autofilled: boolean = false;
    readonly controlType: string = 'title-image-chooser';
    readonly disabled: boolean = false;

    get empty(): boolean {
        return !(this.titleImageSelectFormControl.value && this.titleImageSelectFormControl.value.url);
    }

    readonly errorState: boolean = false;
    readonly focused: boolean = false;
    @HostBinding() id = `title-image-chooser-${TitleImageFormControlChooserComponent.nextId++}`;
    readonly placeholder: string;
    readonly required: boolean;
    readonly shouldLabelFloat: boolean;
    readonly stateChanges = new Subject<void>();

    get value() {
        return this.titleImageSelectFormControl.value as JbFileInfo;
    }

    set value(val: JbFileInfo) {
        this.writeValue(val);
    }

    onAddNewTitleImageClick() {
        this.avatarImageAddModal.show({
            croppieOptions: {
                viewport: {width: 100, height: 100, type: 'square'},
                boundary: {width: 200, height: 200}
            }
        }).then(result => {
            const jbFileInfo = this.fileStoreService.jbUploadedFileInfo2JbFileFindInfo(result);
            this.titleImages.unshift(jbFileInfo);
            this.titleImages = this.titleImages.slice();
            this.titleImageSelectFormControl.setValue(jbFileInfo);
        }, err => {
            console.warn(err);
        });
    }

    onTitleImagesSelectOpen(e) {
        if (this._titleImageSelectOpenedOnce) {
            return;
        }
        this._titleImageSelectOpenedOnce = true;
        this.titleImagesLoading = true;

        return this.fileStoreService.find({
                max: this._titleImagesItemsPerPage,
                page: 1,
                context: 'avatarImage'
            })
            .toPromise()
            .then(paginationResponse => {
                this.titleImagesLoading = false;
                this.titleImages = paginationResponse.items;
                this._titleImagesHasMore = paginationResponse.hasMore;
                this._titleImagesLoadedPage = 1;
                // Else angular didn't detects changes in model
                // in ChangeDetectionStrategy.OnPush mode
                this.cdr.markForCheck();
                return paginationResponse;
            })
            .then(null, err => {
                this.titleImagesLoading = false;
                console.warn(err);
            });
    }

    onTitleImagesSelectScroll({end}) {
        // We fetch more on scrollToEnd
    }

    onTitleImagesSelectScrollToEnd() {
        if (this.titleImagesLoading || !this._titleImagesHasMore) {
            return;
        }

        this._fetchMoreTitleImages();
    }

    onTitleImagesSelectBlur(e) {
        if (this._touchedListener) {
            this._touchedListener(e);
        }
    }

    titleImagesSelectSearchFn(term: string, item: JbFileInfo) {
        if (!item || !term) {
            return true;
        }
        const termUpper = term.toUpperCase();
        const stringsToCheck = [
            item.metadata && item.metadata.originalName && item.metadata.originalName.toUpperCase(),
            item.metadata && item.metadata.description && item.metadata.description.toUpperCase()
        ];

        return stringsToCheck.some(stringToCheck => {
            if (!stringToCheck) {
                return false;
            }
            return stringToCheck.indexOf(termUpper) > -1;
        });
    }

    onRemoveTitleImageFromModel(e) {
        this.titleImageSelectFormControl.setValue(null);
    }

    private _fetchMoreTitleImages() {
        this.titleImagesLoading = true;
        return this.fileStoreService.find({
                max: this._titleImagesItemsPerPage,
                page: this._titleImagesLoadedPage + 1,
                context: 'avatarImage'
            })
            .toPromise()
            .then(paginationResponse => {
                this.titleImagesLoading = false;
                this.titleImages = this.titleImages.concat(paginationResponse.items);
                this._titleImagesHasMore = paginationResponse.hasMore;
                this._titleImagesLoadedPage = this._titleImagesLoadedPage + 1;
                this.cdr.markForCheck();
            })
            .then(null, err => {
                this.titleImagesLoading = false;
                console.warn(err);
            });
    }

    constructor(
        private avatarImageAddModal: AvatarImageAddModal,
        private fileStoreService: FileStoreService,
        private cdr: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl
    ) {
        // Replace the provider from above with this.
        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        this.titleImageSelectFormControl.valueChanges
            .subscribe((val: any) => {
                this.stateChanges.next();
            }, err => {
                this.stateChanges.error(err);
            }, () => {
                this.stateChanges.complete();
            });
    }

    registerOnChange(fn: any): void {
        this.titleImageSelectFormControl.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this._touchedListener = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // ng-select disabled?
        console.info(`TitleImageFormControlChooserComponent exec setDisabledState with isDisabled;${isDisabled}`);
    }

    writeValue(obj: any): void {
        this.titleImageSelectFormControl.setValue(obj);
    }

    onContainerClick(event: MouseEvent): void {
    }

    setDescribedByIds(ids: string[]): void {
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }

}
