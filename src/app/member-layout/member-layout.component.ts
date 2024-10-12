import {Component, OnInit} from '@angular/core';
import {
  faWallet,
  faGaugeHigh,
  faCircleDollarToSlot,
  faUser,
  faChartLine,
  faHeadset,
  faGears,
  faBullseye,
  faEnvelope,
  faUserCircle,
  faRightFromBracket,
  faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {AccountService} from "../_service/Account/account.service";
import {User} from "../_model/user";
import {Observable} from "rxjs";
import {SidebarItem} from "../_model/sidebarItem";
import {truncateText} from "../util/truncateText";
import {UserProfile} from "../_model/User/UserProfile";

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrl: './member-layout.component.css'
})
export class MemberLayoutComponent implements OnInit {

  user: UserProfile = {} as UserProfile;
  faWallet = faWallet;
  faGaugeHigh = faGaugeHigh;
  faCircleDollarToSlot = faCircleDollarToSlot;
  faUser = faUser;
  faChartLine = faChartLine;
  faGears = faGears;
  faBullseye = faBullseye;
  faEnvelope = faEnvelope;
  faUserCircle = faUserCircle;
  faRightFromBracket = faRightFromBracket;
  faEllipsisVertical = faEllipsisVertical;

  selectedItem: SidebarItem | undefined;
  imagePath= 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/409088772_1899516073843732_7466710258896508094_n.jpg?stp=c0.11.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=KPc-vJvXDIgQ7kNvgE66Uq_&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYDFn5tsO-Ng0HINvNMEAFTScYDlr7TmAmsU2CumFn4zBg&oe=66C01D9C'

  sidebarItems : SidebarItem[] = [
    {label: 'Dashboard', icon: this.faGaugeHigh, link: 'member'},
    {label: 'Wallet', icon: this.faWallet, link: 'member/wallet'},
    {label: 'Budget', icon: this.faCircleDollarToSlot, link: 'member/budget'},
    {label: 'Goal', icon: this.faBullseye, link: 'member/goal'},
    {label: 'Analytics', icon: this.faChartLine, link: 'member/analytics'},
    // {label: 'Support', icon: this.faHeadset, link: 'member/support'},
    {label: 'Setting', icon: this.faGears, link: 'member/setting'},
  ];

  navDropItems = [
    {label: 'Profile', icon: this.faUser, link: 'member/profile'},
    {label: 'Wallet', icon: this.faWallet, link: 'member/wallet'},
    {label: 'Setting', icon: this.faGears, link: 'member/setting'},
  ]

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.GetAccountDetail().subscribe({
        next: user => {
          this.user = user
        }
      }
    )
    this.selectedItem = this.sidebarItems[0]
  }

  handleNavDropClick(link: string) {
    this.router.navigate([link])
  }

  handleSignOutButton() {
    this.accountService.signout();
    this.router.navigate(['/'])
  }

  profilePageButton(){
    this.router.navigate(['/member/profile'])
  }

  selectItem(item: SidebarItem){
    this.selectedItem = item;
    this.router.navigate([item.link]);
  }

  protected readonly truncateText = truncateText;
}
