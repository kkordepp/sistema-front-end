import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from "./guards/admin.guard";



import { AppComponent } from './app.component';
import { CriarContaComponent } from './pages/criar-conta/criar-conta.component';
import { AcessarContaComponent } from './pages/acessar-conta/acessar-conta.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { GerenciarProdutosComponent } from './pages/gerenciar-produtos/gerenciar-produtos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'acessar-conta' },
  { path: 'acessar-conta', component: AcessarContaComponent },
  { path: 'alterar-senha', component: AlterarSenhaComponent, canActivate: [AdminGuard] },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'gerenciar-produtos', component: GerenciarProdutosComponent, canActivate: [AdminGuard] },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AcessarContaComponent,
    CriarContaComponent,
    RecuperarSenhaComponent,
    AlterarSenhaComponent,
    GerenciarProdutosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }