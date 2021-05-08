import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AceEditorComponent } from '@postfinance/ngx-ace-editor-wrapper';

import * as ace from 'ace-builds';
import * as modelist from "ace-builds/src-noconflict/ext-modelist";

// import * as modelist from "brace/ext/modelist";

//import '../../../../assets/js/ace-builds/src-noconflict/ace'

/* import 'brace'
import 'brace/ext/language_tools'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'
import 'brace/theme/eclipse'
import 'brace/theme/twilight' */

/* import * as modeList from 'brace/ext/modelist' */
// import { getModeForPath } from 'brace/ext/modelist';


@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.sass']
})
export class CodeEditorComponent implements OnInit {

  @ViewChild(AceEditorComponent) editor: AceEditorComponent;

  @Input() mode = 'text';
  @Input() text: string = '';
  @Input() edTheme: string = 'eclipse';

  @Output() updatedCode = new EventEmitter<{code: string, type:string}>();


  constructor() { }

  ngOnInit(): void {
    ace.config.set('basePath', '/ace-builds/src-noconflict')    
  }

  ngAfterViewInit() {

    console.log(modelist.getModeForPath('path/to/file.txt'));

    this.editor.setMode(this.mode);
    this.editor.setTheme(this.edTheme);

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
    });

    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function (editor) {
        console.log(editor);
      },
    });

    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-s',
      exec: (editor) => {
        console.log('Presionó Ctrl + S');        
        this.updatedCode.emit({code: this.text, type: this.mode});
      },
    });
  }

}
