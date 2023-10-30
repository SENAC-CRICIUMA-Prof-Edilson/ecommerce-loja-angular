import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumoComponent } from './miles/ecommerce/component/checkout/resumo/resumo.component';
import { CheckoutComponent } from './miles/ecommerce/page/checkout/checkout.component';
import { HomeComponent } from './miles/ecommerce/page/home/home.component';
import { ProdutodetalheComponent } from './miles/ecommerce/page/produtodetalhe/produtodetalhe.component';
import { ProdutolojaComponent } from './miles/ecommerce/page/produtoloja/produtoloja.component';
import { AuthComponent } from './miles/ecommerce/component/auth/auth.component';
import { AddresComponent } from './miles/ecommerce/component/checkout/address/address.component';
import { DeliveryComponent } from './miles/ecommerce/component/checkout/delivery/delivery.component';
import { PaymentComponent } from './miles/ecommerce/component/checkout/payment/payment.component';
import { CadastroComponent } from './miles/ecommerce/page/cadastro/cadastro.component';
import { ProdutoCategoriaComponent } from './miles/ecommerce/page/produto/produto-categoria/produto-categoria.component';
import { MinhacontaComponent } from './miles/ecommerce/page/minhaconta/minhaconta.component';
import { EsqueciminhasenhaComponent } from './miles/ecommerce/page/esqueciminhasenha/esqueciminhasenha.component';
import { ProductDetailComponent } from './miles/ecommerce/page/product/product-detail/product-detail.component';
import { DashboardEnderecoComponent } from './miles/ecommerce/page/dashboard/endereco/endereco.component';
import { DashboardDadosComponent } from './miles/ecommerce/page/dashboard/dados/dados.component';
import { DashboardPedidoComponent } from './miles/ecommerce/page/dashboard/pedido/pedido.component';
import { DashboardSenhaComponent } from './miles/ecommerce/page/dashboard/senha/senha.component';
import { LogoutComponent } from './miles/ecommerce/component/logout/logout.component';
import { DashboardComponent } from './miles/ecommerce/page/dashboard/dashboard/dashboard.component';
import { DashboardHomeComponent } from './miles/ecommerce/page/dashboard/home/home.component';
import { IdentifyComponent } from './miles/ecommerce/component/checkout/identify/identify.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'produto/:id',component:ProductDetailComponent},
  {path:'loja',component:ProdutolojaComponent},
  {path:'cadastro', component:CadastroComponent},
  {path:'queromecadastrar', redirectTo:'cadastro', pathMatch:'full'},
  {path:'categoria/:id',component:ProdutoCategoriaComponent},
  {path:'categoria/:descricao/:id',component:ProdutoCategoriaComponent},  
  {path:'esqueciminhasenha', component:EsqueciminhasenhaComponent},
  {path:'logout', component:LogoutComponent},
  {path:'minhaconta',component:MinhacontaComponent},
  {path:'checkout', component:CheckoutComponent,  
    children:[
      {path:'', redirectTo:'resumo', pathMatch: 'full'},
      {path:'resumo', component:ResumoComponent},      
      {path:'autenticacao', component:IdentifyComponent},
      {path:'endereco', component:AddresComponent},
      {path:'entrega', component:DeliveryComponent},
      {path:'pagamento', component:PaymentComponent},
    ]
  },
  {
    path:'dashboard', component:DashboardComponent,    
    children:[
      {path:'', redirectTo:'dados', pathMatch:'full'},
      {path:'dados', component:DashboardDadosComponent},
      {path:'endereco', component:DashboardEnderecoComponent},
      {path:'pedido', component:DashboardPedidoComponent},
      {path:'alterarsenha', component:DashboardSenhaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
