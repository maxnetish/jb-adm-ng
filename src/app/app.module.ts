import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JbToolboxOutletModule} from './widgets/jb-toolbox-outlet/jb-toolbox-outlet.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        JbToolboxOutletModule,
    ],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                autoFocus: true,
                closeOnNavigation: true,
                disableClose: false,
                hasBackdrop: true,
                restoreFocus: false,
                role: 'dialog',
                width: '400px',
            }
        }
        /**
         * Provide custom adapter and formatter for date picker
         */
        // {
        //     provide: NgbDateAdapter,
        //     useClass: NgbDateStringAdapterService
        // },
        // {
        //     provide: NgbDateParserFormatter,
        //     useClass: NgbDateLocaleParserFormatterService
        // }
    ],
    /**
     * entryComponents - components that will instantiates from code, not from markup
     * Such as modals
     */
    bootstrap: [AppComponent],
})
export class AppModule {
}
