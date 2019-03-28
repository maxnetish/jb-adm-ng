import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, ViewChild} from '@angular/core';

import * as ace from 'brace';
import {Editor} from 'brace';
import 'brace/mode/markdown';
import 'brace/mode/html';
import 'brace/theme/github';
import {PostContentType} from '../../resources/post/post-content-type.enum';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'jb-adm-ace-editor',
    templateUrl: './ace-editor.component.html',
    styleUrls: ['./ace-editor.component.less'],
    // these required to register component as ValueAccessor
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AceEditorComponent),
            multi: true
        }
    ]
})
export class AceEditorComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {

    @Input()
    set mode(newMode: PostContentType) {
        if (this.m_mode === newMode) {
            return;
        }
        this.m_mode = newMode;
        if (this.aceEditor) {
            this.aceEditor.getSession().setMode(this.aceEditorModMap[this.m_mode]);
        }
    }

    get mode(): PostContentType {
        return this.m_mode;
    }

    @Input()
    set value(newValue: string) {
        if (this.aceEditor) {
            this.aceEditor.setValue(newValue);
        } else {
            this.m_value = newValue;
        }
    }

    get value(): string {
        if (this.aceEditor) {
            return this.aceEditor.getValue();
        }
        return this.m_value;
    }

    @Output() changed = new EventEmitter<string>();

    private m_onChange: (value: any) => void;
    private m_onTouched: (value?: any) => void;
    private m_value: string;
    private m_mode: PostContentType = PostContentType.MD;
    private aceEditor: Editor;
    private readonly aceEditorTheme = 'ace/theme/github';
    private readonly aceEditorFontSize = '1rem';

    // aceEditorContainerRef will before AfterViewInit hook
    // see https://angular.io/api/core/ViewChild
    @ViewChild('aceEditorContainer') aceEditorContainerRef: ElementRef;

    private readonly aceEditorModMap: { [key: string]: string } = {
        [PostContentType.HTML]: 'ace/mode/html',
        [PostContentType.MD]: 'ace/mode/markdown'
    };

    private m_InitAceEditor() {
        this.aceEditor = ace.edit(this.aceEditorContainerRef.nativeElement);
        this.aceEditor.setTheme(this.aceEditorTheme);
        this.aceEditor.getSession().setMode(this.aceEditorModMap[this.mode]);
        this.aceEditor.setFontSize(this.aceEditorFontSize);
        if (this.m_value) {
            this.aceEditor.setValue(this.m_value);
        }

        // register event handlers for angular forms infrastructure
        this.aceEditor.on('change', this.m_onEditorChange);
        this.aceEditor.on('blur', this.m_onEditorBlur);
    }

    private m_DestroyAceEditor() {
        if (this.aceEditor) {
            this.aceEditor.off('change', this.m_onEditorChange);
            this.aceEditor.off('blur', this.m_onEditorBlur);
            this.aceEditor.destroy();
        }
    }

    // We want to exec this handlers in component context
    m_onEditorChange = () => {
        const newValue = this.aceEditor.getValue();
        if (this.m_onChange) {
            this.m_onChange(newValue);
        }
        this.changed.emit(newValue);
    };
    m_onEditorBlur = () => {
        if (this.m_onTouched) {
            this.m_onTouched();
        }
    };

    constructor() {
    }

    ngAfterViewInit(): void {
        this.m_InitAceEditor();
    }

    registerOnChange(fn: any): void {
        this.m_onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.m_onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (this.aceEditor) {
            this.aceEditor.setReadOnly(isDisabled);
        }
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    ngOnDestroy(): void {
        this.m_DestroyAceEditor();
    }

}
