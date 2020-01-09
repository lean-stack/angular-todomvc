import {Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[bindTo]'
})
export class BindToDirective implements OnChanges {

  @Input('bindTo')
  value: string;

  @Output('bindToChange')
  valueChange = new EventEmitter<string>();

  @HostListener('input')
  onInput() {
    this.value = this.elt.nativeElement.value;
    this.valueChange.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elt.nativeElement.value = this.value;
  }

  constructor(private elt: ElementRef<HTMLInputElement>) { }
}
