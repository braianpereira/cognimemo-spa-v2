import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RemindersComponent} from "./reminders.component";

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RemindersComponent }
	])],
	exports: [RouterModule]
})
export class RemindersRoutingModule { }
