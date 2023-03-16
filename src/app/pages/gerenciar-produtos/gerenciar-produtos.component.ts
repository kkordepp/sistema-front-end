import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-gerenciar-produtos',
  templateUrl: './gerenciar-produtos.component.html',
  styleUrls: ['./gerenciar-produtos.component.css']
})
export class GerenciarProdutosComponent {

  mensagem_sucesso_cadastro: string = '';
  mensagem_erro_cadastro: string = '';

  mensagem_sucesso_edicao: string = '';
  mensagem_erro_edicao: string = '';

  mensagem_sucesso_exclusao: string = '';
  mensagem_erro_exclusao: string = '';

  httpHeaders = new HttpHeaders();

  dados_produtos: any[] = [];
  dados_categorias: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    var json = JSON.parse(localStorage.getItem('dados-usuario') as string);

    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + json.token
    });

    this.spinnerService.show();

    this.httpClient.get(
      environment.apiProdutos + 'api/categorias',
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data) => {
          this.dados_categorias = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(
        () => this.spinnerService.hide()
      );

    this.spinnerService.show();

    this.httpClient.get(
      environment.apiProdutos + 'api/produtos',
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data) => {
          this.dados_produtos = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }

  formCadastrarProduto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl(0, [Validators.required]),
    quantidade: new FormControl(0, [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });

  get formCadastro(): any {
    return this.formCadastrarProduto.controls;
  }

  formAlterarProduto = new FormGroup({
    idProduto: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl(0, [Validators.required]),
    quantidade: new FormControl(0, [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });

  get formEdicao(): any {
    return this.formAlterarProduto.controls;
  }

  cadastrarProduto(): void {

    this.spinnerService.show();

    this.mensagem_sucesso_cadastro = '';
    this.mensagem_erro_cadastro = '';

    this.httpClient.post(
      environment.apiProdutos + 'api/produtos',
      this.formCadastrarProduto.value,
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso_cadastro = data.mensagem;
          this.formCadastrarProduto.reset();
          this.ngOnInit();
        },
        error: (e) => {
          this.mensagem_erro_cadastro = e.error.mensagem;
          console.log(e.error);
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }

  atualizarProduto(): void {

    this.spinnerService.show();

    this.mensagem_sucesso_edicao = '';
    this.mensagem_erro_edicao = '';

    this.httpClient.put(
      environment.apiProdutos + 'api/produtos',
      this.formAlterarProduto.value,
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data: any) => {
          this.mensagem_sucesso_edicao = data.mensagem;
          this.ngOnInit();
        },
        error: (e) => {
          this.mensagem_erro_edicao = e.error.mensagem;
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }

  obterProduto(idProduto: string): void {

    this.spinnerService.show();

    this.mensagem_sucesso_exclusao = '';
    this.mensagem_erro_exclusao = '';

    this.mensagem_sucesso_edicao = '';
    this.mensagem_erro_edicao = '';

    this.httpClient.get(
      environment.apiProdutos + 'api/produtos/' + idProduto,
      { headers: this.httpHeaders }
    )
      .subscribe({
        next: (data: any) => {
          this.formAlterarProduto.patchValue(data);
          this.formAlterarProduto.controls['idCategoria'].setValue(data.categoria.idCategoria);
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(
        () => this.spinnerService.hide()
      );
  }

  excluirProduto(idProduto: string): void {

    if (window.confirm('Deseja realmente excluir este produto?')) {

      this.spinnerService.show();

      this.mensagem_sucesso_exclusao = '';
      this.mensagem_erro_exclusao = '';

      this.httpClient.delete(
        environment.apiProdutos + 'api/produtos/' + idProduto,
        { headers: this.httpHeaders }
      )
        .subscribe({
          next: (data: any) => {
            this.mensagem_sucesso_exclusao = data.mensagem;
            this.ngOnInit();
          },
          error: (e) => {
            this.mensagem_erro_exclusao = e.error.mensagem;
          }
        }).add(
          () => this.spinnerService.hide()
        );
    }
  }
}