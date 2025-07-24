import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TonConnectUI, TonConnectUiCreateOptions } from '@tonconnect/ui';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TonConnectService {
  private readonly tonConnectUI: TonConnectUI | null = null;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const options: TonConnectUiCreateOptions = {
        manifestUrl:
          'https://shhh-toshi-app-frontend.vercel.app/assets/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-button',
      };
      this.tonConnectUI = new TonConnectUI(options);
    }
  }

  getTonConnectUI(): TonConnectUI | null {
    return this.tonConnectUI;
  }

  async disconnectWallet(): Promise<void> {
    if (this.tonConnectUI) {
      await this.tonConnectUI.disconnect();
      localStorage.removeItem('walletAddress');
      console.log('🔌 Wallet disconnected');
    }
  }
}
