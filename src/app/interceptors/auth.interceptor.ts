import {HttpErrorResponse, HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    // tap permite capturar o sucesso da resposta, onde você pode acessar o status code
    tap((event: HttpEvent<any>) => {
      // Se o evento é do tipo HttpResponse, significa que a requisição foi bem-sucedida
      if (event.type === 4) { // 4 é o código para HttpResponse
        //console.log('Status Code:', event['status']);
      }
    }),

    // catchError captura erros
    catchError((error: HttpErrorResponse) => {
      // console.error('Error Code:', error.status); // Captura o código do erro
      // console.error('Error Message:', error.message); // Exibe a mensagem de erro

      // Aqui você pode implementar lógica adicional, como redirecionamento no erro 401
      if (error.status === 401) {
        // Redirecionar para login ou exibir um modal, por exemplo
        router.navigate(['/login']);
        localStorage.removeItem('authUser');
      }

        if (error.status === 419) {
            // Redirecionar para login ou exibir um modal, por exemplo
            router.navigate(['/login']);
            localStorage.removeItem('authUser');
        }

      // Tratamento de erros ou retorno para o fluxo de erro
      return throwError(() => error);
      // return error
    })
  );
};
