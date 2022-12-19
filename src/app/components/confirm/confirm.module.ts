import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {ConfirmDialogComponent} from './confirm.component';
import {ConfirmDialogService} from './confirm.service';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    exports: [
        ConfirmDialogComponent
    ],
    providers: [
       ConfirmDialogService
    ]
})
export class ConfirmDialogModule
{
}