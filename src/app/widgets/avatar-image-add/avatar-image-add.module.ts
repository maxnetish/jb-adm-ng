import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarImageAddComponent, AvatarImageAddModal} from './avatar-image-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {JbCropperModule} from '../jb-cropper/jb-cropper.module';

@NgModule({
    declarations: [
        AvatarImageAddComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        JbCropperModule,
        MatButtonModule,
        MatFormFieldModule,
    ],
    entryComponents: [
        AvatarImageAddComponent,
    ],
    providers: [
        AvatarImageAddModal,
    ],
})
export class AvatarImageAddModule {
}
