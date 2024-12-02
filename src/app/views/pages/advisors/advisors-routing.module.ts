import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdvisorsComponent} from "./advisors.component";

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AdvisorsComponent }
	])],
	exports: [RouterModule]
})
export class AdvisorsRoutingModule { }
