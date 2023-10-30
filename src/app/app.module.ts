import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './layout/topo/topo.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { ContentComponent } from './layout/content/content.component';
import { HomeComponent } from './miles/ecommerce/page/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SliderComponent } from './layout/slider/slider.component';
import { ProdutodetalheComponent } from './miles/ecommerce/page/produtodetalhe/produtodetalhe.component';
import { ProdutolojaComponent } from './miles/ecommerce/page/produtoloja/produtoloja.component';
import { CheckoutComponent } from './miles/ecommerce/page/checkout/checkout.component';
import { DashboardHomeComponent } from './miles/ecommerce/page/dashboard/home/home.component';


// -- PRIME NG
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';

import { ResumoComponent } from './miles/ecommerce/component/checkout/resumo/resumo.component';
import { AuthComponent } from './miles/ecommerce/component/auth/auth.component';
import { AddresComponent } from './miles/ecommerce/component/checkout/address/address.component';
import { DeliveryComponent } from './miles/ecommerce/component/checkout/delivery/delivery.component';
import { ProductItemComponent } from './miles/ecommerce/component/product/product-item/product-item.component';
import { CartHeaderComponent } from './miles/ecommerce/component/cart/cart-header/cart-header.component';
import { ProductItemListComponent } from './miles/ecommerce/component/product/product-item-list/product-item-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentComponent } from './miles/ecommerce/component/checkout/payment/payment.component';
import { CadastroComponent } from './miles/ecommerce/page/cadastro/cadastro.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { CorreiosComponent } from './miles/ecommerce/component/checkout/delivery/carries/correios/correios.component';
import { SelfDeliveryComponent } from './miles/ecommerce/component/checkout/delivery/carries/self-delivery/self-delivery.component';
import { ProdutoCategoriaComponent } from './miles/ecommerce/page/produto/produto-categoria/produto-categoria.component';
import { MinhacontaComponent } from './miles/ecommerce/page/minhaconta/minhaconta.component';
import { EsqueciminhasenhaComponent } from './miles/ecommerce/page/esqueciminhasenha/esqueciminhasenha.component';
import { ProductDetailComponent } from './miles/ecommerce/page/product/product-detail/product-detail.component';
import { DashboardComponent } from './miles/ecommerce/page/dashboard/dashboard/dashboard.component';
import { DashboardEnderecoComponent } from './miles/ecommerce/page/dashboard/endereco/endereco.component';
import { DashboardPedidoComponent } from './miles/ecommerce/page/dashboard/pedido/pedido.component';
import { DashboardSenhaComponent } from './miles/ecommerce/page/dashboard/senha/senha.component';
import { DashboardDadosComponent } from './miles/ecommerce/page/dashboard/dados/dados.component';
import { HeaderLogonComponent } from './miles/ecommerce/component/header-logon/header-logon.component';
import { LogoutComponent } from './miles/ecommerce/component/logout/logout.component';
import { LogonComponent } from './miles/ecommerce/component/logon/logon.component';
import { IdentifyComponent } from './miles/ecommerce/component/checkout/identify/identify.component';
import { AvisoLogadoComponent } from './miles/ecommerce/component/aviso-logado/aviso-logado.component';
import { PageSubtitleComponent } from './layout/page-subtitle/page-subtitle.component';
import { AddressAddComponent } from './miles/ecommerce/component/address-add/address-add.component';
import { NewsletterComponent } from './miles/ecommerce/component/newsletter/newsletter.component';
import { RedessociaisComponent } from './miles/ecommerce/component/redessociais/redessociais.component';
import { FooterMenuComponent } from './miles/ecommerce/component/footer-menu/footer-menu.component';
import { AccessComponent } from './miles/ecommerce/page/access/access.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    HomeComponent,    
    FooterComponent,
    SliderComponent,
    ProdutodetalheComponent,
    ProdutolojaComponent,
    CheckoutComponent,
    ResumoComponent,
    AuthComponent,
    AddresComponent,
    DeliveryComponent,
    ProductItemComponent,
    CartHeaderComponent,
    ProductItemListComponent,
    PaymentComponent,
    CadastroComponent,
    PageTitleComponent,
    CorreiosComponent,
    SelfDeliveryComponent,
    ProdutoCategoriaComponent,
    MinhacontaComponent,
    EsqueciminhasenhaComponent,
    ProductDetailComponent,
    DashboardComponent,
    DashboardEnderecoComponent,
    DashboardPedidoComponent,
    DashboardSenhaComponent,
    DashboardDadosComponent,
    HeaderLogonComponent,
    LogoutComponent,
    LogonComponent,
    IdentifyComponent,
    AvisoLogadoComponent,
    DashboardHomeComponent,
    PageSubtitleComponent,
    AddressAddComponent,
    NewsletterComponent,
    RedessociaisComponent,
    FooterMenuComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StepsModule,
    CardModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ListboxModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    SplitterModule,
    PanelModule,
    MessagesModule,
    InputNumberModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
