import {Component, TemplateRef} from '@angular/core';
import {JbTemplateInjectorService} from '../../utils/jb-template-injector.service';
import {filter} from 'rxjs/operators';

export const JB_TOOLBOX_TARGET = 'JB_TOOLBOX';

@Component({
    selector: 'jb-adm-toolbox-outlet',
    templateUrl: './jb-toolbox-outlet.component.html',
    styleUrls: ['./jb-toolbox-outlet.component.less']
})
export class JbToolboxOutletComponent {

    toolBoxInjectedTemplate: TemplateRef<any>;

    constructor(
        private templateInjector: JbTemplateInjectorService
    ) {
        this.templateInjector.injects
            .pipe(filter(inj => inj.target === JB_TOOLBOX_TARGET))
            .subscribe(inj => this.toolBoxInjectedTemplate = inj.template);
    }

}
