import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdvisorsRoutingModule } from './advisors-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import {AccordionModule} from "primeng/accordion";
import {BadgeModule} from "primeng/badge";
import {StyleClassModule} from "primeng/styleclass";
import {FloatLabelModule} from "primeng/floatlabel";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {TreeSelectModule} from "primeng/treeselect";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {CalendarModule} from "primeng/calendar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AdvisorsComponent} from "./advisors.component";
import {RemindersModule} from "../reminders/reminders.module";

@NgModule({
    imports: [
        CommonModule,
        AdvisorsRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        AccordionModule,
        BadgeModule,
        NgOptimizedImage,
        StyleClassModule,
        ReactiveFormsModule,
        FloatLabelModule,
        CheckboxModule,
        MultiSelectModule,
        TreeSelectModule,
        InputGroupModule,
        InputGroupAddonModule,
        CascadeSelectModule,
        CalendarModule,
        ConfirmDialogModule,
        RemindersModule
    ],
    declarations: [AdvisorsComponent]
})
export class AdvisorsModule { }
