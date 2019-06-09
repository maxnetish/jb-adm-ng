import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageLoginComponent} from './page-login.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    declarations: [
        PageLoginComponent,
    ],
})
export class PageLoginModule {
}
