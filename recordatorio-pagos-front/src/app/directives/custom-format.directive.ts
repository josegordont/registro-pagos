import { NgModule } from "@angular/core";
import { CustomEmailDirective, FormatPriceDirective, LettersNumbersDirective } from "./custom.directivemodule";
import { NgbdSortableHeader } from "./sortable.directive";

@NgModule({
    declarations: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective,
        NgbdSortableHeader
    ],
    exports: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective,
        NgbdSortableHeader
    ]
})
export class CustomDirectiveModule { }