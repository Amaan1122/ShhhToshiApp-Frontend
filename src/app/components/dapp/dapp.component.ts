import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { WalletComponent } from '../wallet/wallet.component';

@Component({
  selector: 'app-dapp',
  standalone: true,
  imports: [CommonModule, HeaderComponent, WalletComponent,FooterComponent],
  templateUrl: './dapp.component.html',
  styleUrl: './dapp.component.scss',
})
export class DappComponent {}
