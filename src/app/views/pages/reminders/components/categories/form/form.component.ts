import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {DefaultClass} from "../../../../../../classes/default.class";
import {ReminderTypesService} from "../../../../../../services/reminder_types.service";
import {AuthService} from "../../../../../../auth/auth.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
    imports: [
        ButtonDirective,
        CalendarModule,
        DropdownModule,
        FloatLabelModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        Ripple,
        NgClass,
        NgIf
    ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent extends DefaultClass implements OnInit {
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
                    this.advisorService.advisee$.subscribe({
                        next: advisee => {
                            if (advisee) {
                                this.reminderTypesService.postAdvisee(type, advisee.id).subscribe({
                                    next: (nType) => {
                                        this.ref.close({
                                            severity: 'success',
                                            summary: 'Categoria criada atualizada',
                                            data: nType
                                        })

                                        this.loadingService.hide()
                                    },
                                    error: error => {
                                        if (error.status === 422) {
                                            const backendErrors = error.error.errors; // Estrutura típica de validação no Laravel
                                            for (const field in backendErrors) {
                                                const control = this.form.get(field);
                                                if (control) {
                                                    control.setErrors({backend: backendErrors[field].join(' ')});
                                                }
                                            }
                                        }

                                        console.info(error)
                                        this.loadingService.hide()
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Erro ao criar',
                                            detail: 'Se o erro persistir entre em contato com o suporte'
                                        })
                                    }
                                })
                            } else {
                                this.reminderTypesService.post(type).subscribe({
                                    next: (nType) => {
                                        this.ref.close({
                                            severity: 'success',
                                            summary: 'Categoria criada atualizada',
                                            data: nType
                                        })

                                        this.loadingService.hide()
                                    },
                                    error: error => {
                                        if (error.status === 422) {
                                            const backendErrors = error.error.errors; // Estrutura típica de validação no Laravel
                                            for (const field in backendErrors) {
                                                const control = this.form.get(field);
                                                if (control) {
                                                    control.setErrors({backend: backendErrors[field].join(' ')});
                                                }
                                            }
                                        }

                                        console.info(error)
                                        this.loadingService.hide()
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Erro ao criar',
                                            detail: 'Se o erro persistir entre em contato com o suporte'
                                        })
                                    }
                                })
                            }
                        }
                    })
                },
                error: error => {
                    console.info(error)
                    this.loadingService.hide()
                    this.messageService.add({severity: 'error', summary: 'Erro ao criar', detail: 'Se o erro persistir entre em contato com o suporte'})
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
