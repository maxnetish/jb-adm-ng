import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JbToolboxOutletComponent} from './jb-toolbox-outlet.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        JbToolboxOutletComponent,
    ],
    exports: [
        JbToolboxOutletComponent,
    ]
})
export class JbToolboxOutletModule {
}
