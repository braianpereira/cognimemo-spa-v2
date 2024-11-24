import {pipe} from "rxjs";
import {inject} from "@angular/core";
import {LoadingService} from "../services/loading.service";
import {MessageService} from "primeng/api";

@pipe()
export abstract class DefaultClass {
    loadingService = inject(LoadingService);
    messageService = inject(MessageService)
}
