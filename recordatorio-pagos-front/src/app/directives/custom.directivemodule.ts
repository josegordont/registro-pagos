import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

@Directive({
    selector: '[formatPrice]'
})
export class FormatPriceDirective implements OnInit {

    @Input('formatPrice') numberDecimals: number;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) { }

    ngOnInit() { }

    @HostListener('blur')
    onBlur() {
        let value = this.el.nativeElement.value;
        if (value.length > 0) {
            if (value.lastIndexOf(',') !== -1) {
                let format = this.pad('', this.numberDecimals - (value.length - 1 - value.lastIndexOf(',')), '0');
                value += format;
            } else {
                let format = ',' + this.pad('', this.numberDecimals, '0');
                value += format;
            }
        }
        this.ngModelChange.emit(value);
    }

    pad(input: any, length: number, padding: any): any {
        var str = input + "";
        return (length <= str.length) ? str : this.pad(str + padding, length, padding);
    }
}