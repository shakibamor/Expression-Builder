import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  caretPos = 0;
  activeEl: any;

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart === '0') {
      this.caretPos = oField.selectionStart;
      this.activeEl = document.activeElement;
    }
  }

  insertAtCursor(myField, myValue) {
    // IE support
    if (document.getSelection) {
      myField.focus();
      let sel = document.getSelection().toString();
      sel = myValue;
    }
    // Microsoft Edge
    if (window.navigator.userAgent.indexOf('Edge') > -1) {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;

      myField.value = myField.value.substring(0, startPos) + myValue
        + myField.value.substring(endPos, myField.value.length);

      const pos = startPos + myValue.length;
      myField.focus();
      myField.setSelectionRange(pos, pos);
    }
    // MOZILLA and others
    if (myField.selectionStart || myField.selectionStart === '0') {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }
  insertText() {

    this.insertAtCursor(document.activeElement, ' NewText ');

  }

  insertOption(variableName: string) {
    this.insertAtCursor(this.activeEl, ' ' + variableName + ' ');
  }

}
