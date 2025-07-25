import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Wallet,
} from '@tonconnect/ui';
import { Router } from '@angular/router';
import { TonConnectService } from '../../services/ton-connect.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  walletSaved = false;
  walletAddress: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly route: Router,
    private readonly tonService: TonConnectService
  ) {}

  ngOnInit(): void {
    const tonConnectUI = this.tonService.getTonConnectUI();
    if (!tonConnectUI) return;

    tonConnectUI.onStatusChange((wallet: Wallet | null) => {
      if (wallet?.account?.address) {
        const walletAddress = wallet.account.address;
        localStorage.setItem('walletAddress', walletAddress);
        console.log('✅ Wallet connected:', walletAddress);
        this.route.navigate(['d-app']);

        // Send to backend
        fetch('https://localhost:5000/api/user/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallet: walletAddress }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('✅ Wallet info saved:', data);
            this.walletSaved = true;
          })
          .catch((err) => {
            console.error('❌ Save error:', err);
          });
      }
    });
  }
}
