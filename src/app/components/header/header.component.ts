import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TonConnectService } from '../../services/ton-connect.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  walletAddress: string = '';

  constructor(
    private readonly tonService: TonConnectService,
    private readonly route: Router
  ) {
    this.tonService.walletConnected$.subscribe((connected) => {
      if (connected) {
        const walletAddress = this.tonService.getCurrentWalletAddress();
        this.walletAddress = walletAddress;
        console.log(walletAddress);
      }
    });
  }
  disconnectWallet() {
    this.tonService.disconnectWallet();
    this.route.navigate(['dashboard']);
  }
}
