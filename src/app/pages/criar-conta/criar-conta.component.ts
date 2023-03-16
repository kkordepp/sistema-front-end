import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }

  formCadastro = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),

    email: new FormControl('',
      [Validators.required, Validators.email]),

    senha: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),

    senhaConfirmacao: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    this.spinnerService.show();

    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    this.httpClient.post(
      environment.apiUsuarios + 'api/register',
      this.formCadastro.value
    )

      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = data.mensagem;
          this.formCadastro.reset();
        },
        error: (e) => {
          this.mensagem_erro = e.error.mensagem;
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }
}