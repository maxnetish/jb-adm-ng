import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrependBackendHostModule} from '../../utils/prepend-backend-host.pipe';
import {MatButtonModule, MatFormFieldModule} from '@angular/material';
import {NgSelectModule} from '@ng-select/ng-select';
import {AvatarImageAddModule} from '../avatar-image-add/avatar-image-add.module';
import {TitleImageFormControlChooserComponent} from './title-image-form-control-chooser.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PrependBackendHostModule,
        MatButtonModule,
        NgSelectModule,
        AvatarImageAddModule,
        MatFormFieldModule,
    ],
    declarations: [
        TitleImageFormControlChooserComponent,
    ],
    exports: [
        TitleImageFormControlChooserComponent,
    ]
})
export class TitleImageFormControlChooserModule {
}
