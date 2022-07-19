import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

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

@Directive({
    selector: '[customEmail]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CustomEmailDirective, multi: true }]
})
export class CustomEmailDirective implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {
        if (control.value !== undefined && control.value !== null && control.value !== '') {
            /** arroba */
            let correo: string = control.value;
            if (!correo.includes('@')) {
                return { email: true };
            } else {
                let correoSinArrba = correo.replace('@', '');
                if (correoSinArrba.includes('@')) {
                    return { email: true };
                }
            }
            /** ultimo caracter es una letra */
            const LETRA = /[A-Za-z]/;
            let ultimoCaracter = control.value.substring(control.value.length - 1, control.value.length);
            if (!LETRA.test(ultimoCaracter)) {
                return { email: true };
            }
            /** validar que tenga dominio */
            let dominio: string = correo.substring(correo.indexOf('@') + 1);
            if (!dominio.includes('.')) {
                return { email: true };
            }
        }
        return null;
    }

}

@Directive({
    selector: '[onlyLettersNumbers]'
})
export class LettersNumbersDirective {

    constructor() { }

    @HostListener('keypress', ['$event'])
    onkeyPress(event: KeyboardEvent): any {
        const CLAVE_REGEXP = /^[A-Za-z0-9]+$/;
        if (!CLAVE_REGEXP.test(event.key)) {
            return false;
        }
    }

}

@Directive({
    selector: '[onlyLettersNumbersValidation]',
    providers: [{ provide: NG_VALIDATORS, useExisting: LettersNumbersValidationDirective, multi: true }]
})
export class LettersNumbersValidationDirective implements Validator {

    constructor(private el: ElementRef) { }

    validate(control: AbstractControl): { [key: string]: any } | null {
        let value = this.el.nativeElement.value;
        if (value.length > 0) {
            const CLAVE_REGEXP = /^[A-Za-z0-9]+$/;
            if (!CLAVE_REGEXP.test(value)) {
                return { format: true };
            }
        }
        return null;
    }
}