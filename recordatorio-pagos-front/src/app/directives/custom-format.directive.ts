import { NgModule } from "@angular/core";
import { CustomEmailDirective, FormatPriceDirective, LettersNumbersDirective, LettersNumbersValidationDirective } from "./custom.directivemodule";
import { NgbdSortableHeader } from "./sortable.directive";

@NgModule({
    declarations: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective,
        NgbdSortableHeader,
        LettersNumbersValidationDirective
    ],
    exports: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective,
        NgbdSortableHeader,
        LettersNumbersValidationDirective
    ]
})
export class CustomDirectiveModule { }