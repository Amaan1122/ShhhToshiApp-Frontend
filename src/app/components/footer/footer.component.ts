import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  House,
  Coins,
  Gift,
  Users,
  Wallet,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  House = House;
  Coins = Coins;
  Gift = Gift;
  Users = Users;
  Wallet = Wallet;

  constructor(private readonly route: Router) {}

  navigateToHome() {
    this.route.navigate(['d-app']);
  }
  navigateToStake() {
    this.route.navigate(['staking']);
  }
  navigateToTask() {
    this.route.navigate(['tasks']);
  }
  navigateToRefferal() {
    this.route.navigate(['wallet']);
  }
  navigateToWallet() {
    this.route.navigate(['wallet']);
  }
}
