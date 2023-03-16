import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-acessar-conta',
  templateUrl: './acessar-conta.component.html',
  styleUrls: ['./acessar-conta.component.css']
})
export class AcessarContaComponent {

  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }

  formLogin = new FormGroup({

    email: new FormControl('',
      [Validators.required, Validators.email]),

    senha: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    this.mensagem_erro = '';

    this.httpClient.post(
      environment.apiUsuarios + 'api/login',
      this.formLogin.value
    )
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('dados-usuario', JSON.stringify(data));
          window.location.href = '/gerenciar-produtos';
          this.formLogin.reset();
        },
        error: (e) => {
          this.mensagem_erro = e.error.mensagem;
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }
}