import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[focusOn]'
})
export class FocusOnDirective implements OnChanges {

  @Input('focusOn')
  focused: boolean;

  constructor(private elt: ElementRef<HTMLInputElement>) { }

  ngOnChanges(): void {
    if( this.focused) {
      this.elt.nativeElement.focus();
    }
  }
}
