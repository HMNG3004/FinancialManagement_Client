import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDetailsPageComponent } from './wallet-details-page.component';

describe('WalletDetailsPageComponent', () => {
  let component: WalletDetailsPageComponent;
  let fixture: ComponentFixture<WalletDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
