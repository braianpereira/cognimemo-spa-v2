import {Component, inject, OnInit} from '@angular/core';
import {DefaultClass} from "../../../../../classes/default.class";
import {ReminderTypesService} from "../../../../../services/reminder_types.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../../auth/auth.service";

@Component({
  selector: 'app-categories',
  standalone: true,
    imports: [
    ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent extends DefaultClass implements OnInit {
    reminderTypesService = inject(ReminderTypesService)
    authService = inject(AuthService)
    ref = inject(DynamicDialogRef)
    config = inject(DynamicDialogConfig)
    confirmationService = inject(ConfirmationService)
    fb = inject(FormBuilder)

    protected form = this.fb.group({
        name: new FormControl('', [Validators.required]),
    })

    ngOnInit() {
    }

    submit(event) {
        this.form?.markAllAsTouched()
        this.form?.markAsDirty()

        if (this.form?.valid) {
            this.loadingService.show()

            let type = this.form.value
            this.authService.getCsrfToken().subscribe({
                next: () => {
                    this.reminderTypesService.post(type).subscribe({
                        next: (nType) => {
                            this.ref.close({severity: 'success', summary: 'Categoria criada atualizada', data: nType})

                            this.loadingService.hide()
                        },
                        error: error => {
                            console.info(error)
                            this.loadingService.hide()
                        }
                    })
                },
                error: error => {
                   console.info(error)
                    this.loadingService.hide()
                }
            });

        }
    }

    isInvalid(formControl: string) {
        return this.form.get(formControl)?.invalid
            && (this.form.get(formControl)?.dirty
                || this.form.get(formControl)?.touched)
    }

    hideDialog(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Cancelar?',
            header: 'Confirmar o cancelamento',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.ref.close({ severity: 'info', summary: 'Cancelado' })
            },
            reject: () => {

            }
        });
    }
}
