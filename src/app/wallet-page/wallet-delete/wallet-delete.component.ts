import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-wallet-delete',
  templateUrl: './wallet-delete.component.html',
  styleUrl: './wallet-delete.component.css'
})
export class WalletDeleteComponent {
  @Input() isModalDeleteOpen!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Output() walletCreated = new EventEmitter<void>();
}
