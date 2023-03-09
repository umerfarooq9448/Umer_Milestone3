import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirectiveDirective {
//  creating a custom directory in order to apply the same color where ever required
  constructor(private ref:ElementRef) { 
    this.ref.nativeElement.style.color='#e08492';
  }

}
