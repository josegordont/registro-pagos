import { NgModule } from "@angular/core";
import { FormatPriceDirective } from "./custom.directivemodule";

@NgModule({
    declarations: [
        FormatPriceDirective
    ],
    exports: [
        FormatPriceDirective
    ]
})
export class CustomDirectiveModule { }