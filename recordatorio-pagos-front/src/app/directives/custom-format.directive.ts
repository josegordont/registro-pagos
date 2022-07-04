import { NgModule } from "@angular/core";
import { CustomEmailDirective, FormatPriceDirective, LettersNumbersDirective } from "./custom.directivemodule";

@NgModule({
    declarations: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective
    ],
    exports: [
        FormatPriceDirective,
        CustomEmailDirective,
        LettersNumbersDirective
    ]
})
export class CustomDirectiveModule { }