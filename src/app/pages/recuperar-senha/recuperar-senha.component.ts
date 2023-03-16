import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }

  formRecuperarSenha = new FormGroup({

    email: new FormControl('',
      [Validators.required, Validators.email]),
  });

  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    //limpando as mensagens
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.post(
      environment.apiUsuarios + 'api/passwordrecover',
      this.formRecuperarSenha.value
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = data.mensagem;
          this.formRecuperarSenha.reset();
        },
        error: (e) => {
          this.mensagem_erro = e.error.mensagem;
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }
}