import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  LucideAngularModule,
  ArrowUpRight,
  Gift,
  CircleCheck,
  CalendarDays,
  BadgeDollarSign,
  ChartNoAxesCombined,
  ExternalLink,
  BriefcaseBusiness,
  Coins,
  TrendingUp,
} from 'lucide-angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  ExternalLink = ExternalLink;
  CalendarDays = CalendarDays;
  BadgeDollarSign = BadgeDollarSign;
  ChartNoAxesCombined = ChartNoAxesCombined;
  BriefcaseBusiness = BriefcaseBusiness;
  Coins = Coins;
  TrendingUp = TrendingUp;

  activities = [
    {
      icon: ArrowUpRight,
      title: 'Stake',
      date: 'Jul 23, 04:59 PM',
      amount: '+100.0000',
      currency: 'TON',
      status: 'completed',
      color: 'text-green',
    },
    {
      icon: Gift,
      title: 'Reward',
      date: 'Jul 24, 04:59 PM',
      amount: '+2.1567',
      currency: 'TON',
      status: 'failed',
      color: 'text-danger',
    },
    {
      icon: CircleCheck,
      title: 'Task',
      date: 'Jul 25, 01:59 PM',
      amount: '+500.0000',
      currency: 'PTS',
      status: 'pending',
      color: 'text-warning',
    },
    {
      icon: Gift,
      title: 'Reward',
      date: 'Jul 24, 04:59 PM',
      amount: '+2.1567',
      currency: 'TON',
      status: 'completed',
      color: 'text-green',
    },
  ];

  constructor() {}
}
