import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  TonConnectUI,
  TonConnectUiCreateOptions,
  Wallet,
} from '@tonconnect/ui';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TonConnectService {
  private readonly tonConnectUI: TonConnectUI | null = null;

  // Add reactive state management
  private readonly walletAddressSubject = new BehaviorSubject<string>('');
  private readonly walletConnectedSubject = new BehaviorSubject<boolean>(false);
  private readonly walletDataSubject = new BehaviorSubject<Wallet | null>(null);

  // Public observables
  walletAddress$ = this.walletAddressSubject.asObservable();
  walletConnected$ = this.walletConnectedSubject.asObservable();
  walletData$ = this.walletDataSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const options: TonConnectUiCreateOptions = {
        manifestUrl:
          'https://shhh-toshi-app-frontend.vercel.app/assets/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-button',
      };
      this.tonConnectUI = new TonConnectUI(options);

      // Set up wallet state listener
      this.initializeWalletListener();
      // Check for existing wallet connection
      this.checkStoredWalletAddress();
    }
  }

  getTonConnectUI(): TonConnectUI | null {
    return this.tonConnectUI;
  }

  // New method to initialize wallet listener
  private initializeWalletListener(): void {
    if (!this.tonConnectUI) return;

    this.tonConnectUI.onStatusChange((wallet: Wallet | null) => {
      if (wallet?.account?.address) {
        // Wallet connected
        this.setWalletInfo(wallet);
      } else {
        // Wallet disconnected
        this.clearWalletInfo();
      }
    });
  }

  // Set wallet information when connected
  private setWalletInfo(wallet: Wallet): void {
    const address = wallet.account.address;
    this.walletAddressSubject.next(address);
    this.walletConnectedSubject.next(true);
    this.walletDataSubject.next(wallet);

    // Store in localStorage for persistence
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('walletConnected', 'true');

    console.log('✅ Wallet connected:', address);
  }

  // Clear wallet information when disconnected
  private clearWalletInfo(): void {
    this.walletAddressSubject.next('');
    this.walletConnectedSubject.next(false);
    this.walletDataSubject.next(null);

    // Clear from localStorage
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');

    console.log('🔌 Wallet disconnected');
  }

  // Check localStorage for previously stored wallet
  private checkStoredWalletAddress(): void {
    const storedAddress = localStorage.getItem('walletAddress');
    const isConnected = localStorage.getItem('walletConnected') === 'true';

    if (storedAddress && isConnected) {
      this.walletAddressSubject.next(storedAddress);
      this.walletConnectedSubject.next(true);
    }
  }

  // Public methods for components to use
  getCurrentWalletAddress(): string {
    return this.walletAddressSubject.value;
  }

  isWalletConnected(): boolean {
    return this.walletConnectedSubject.value;
  }

  getCurrentWalletData(): Wallet | null {
    return this.walletDataSubject.value;
  }

  async disconnectWallet(): Promise<void> {
    if (this.tonConnectUI) {
      await this.tonConnectUI.disconnect();
      // clearWalletInfo will be called automatically by the status change listener
    }
  }

  // Method to send transactions (bonus feature)
  async sendTransaction(transaction: any): Promise<any> {
    if (!this.tonConnectUI) {
      throw new Error('TonConnect UI not initialized');
    }

    if (!this.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }

    return await this.tonConnectUI.sendTransaction(transaction);
  }
}
