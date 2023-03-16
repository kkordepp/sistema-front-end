import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  dadosUsuario: any = {};

  httpHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    var json = JSON.parse(localStorage.getItem('dados-usuario') as string);
    this.dadosUsuario = json;

    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + json.token
    });
  }

  formAlterarSenha = new FormGroup({
    senhaAtual: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    novaSenha: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    novaSenhaConfirmacao: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });

  get form(): any {
    return this.formAlterarSenha.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.put(
      environment.apiUsuarios + 'api/modifypassword',
      this.formAlterarSenha.value,
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = data.mensagem;
          this.formAlterarSenha.reset();
        },
        error: (e) => {
          this.mensagem_erro = e.error.mensagem;
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }

  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      localStorage.removeItem('dados-usuario');
      window.location.href = '/acessar-conta';
    }
  }
}