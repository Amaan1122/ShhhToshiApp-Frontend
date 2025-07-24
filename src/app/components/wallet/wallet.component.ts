import { Component } from '@angular/core';
import { TonConnectService } from '../../services/ton-connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  constructor(
    private readonly tonService: TonConnectService,
    private readonly route: Router
  ) {}
  disconnectWallet() {
    this.tonService.disconnectWallet();
    this.route.navigate(['dashboard']);
  }
}
