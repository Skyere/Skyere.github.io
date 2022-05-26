import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { UserMessagesService } from '../../ubs/ubs-user/services/user-messages.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JwtService } from '@global-service/jwt/jwt.service';

@Component({
  selector: 'app-ubs-base-sidebar',
  templateUrl: './ubs-base-sidebar.component.html',
  styleUrls: ['./ubs-base-sidebar.component.scss']
})
export class UbsBaseSidebarComponent implements AfterViewInit, OnDestroy {
  private destroySub: Subject<boolean> = new Subject<boolean>();
  readonly bellsNoneNotification = 'assets/img/sidebarIcons/none_notification_Bell.svg';
  readonly bellsNotification = 'assets/img/sidebarIcons/notification_Bell.svg';
  private adminRoleValue = 'ROLE_ADMIN';
  destroy: Subject<boolean> = new Subject<boolean>();
  @Input() public listElements: object[] = [];
  @Input() public listElementsMobile: object[] = [];
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('sideBarIcons') sideBarIcons: ElementRef;
  @ViewChild('sidebarContainer') sidebarContainer: ElementRef;

  constructor(
    public serviceUserMessages: UserMessagesService,
    public breakpointObserver: BreakpointObserver,
    public jwtService: JwtService
  ) {}

  public getIcon(listItem): string {
    return listItem.link === this.bellsNoneNotification && this.serviceUserMessages.countOfNoReadeMessages
      ? this.bellsNotification
      : listItem.link;
  }

  public toggleSideBar(): void {
    this.drawer.toggle();
    if (this.drawer.opened) {
      this.sideBarIcons.nativeElement.style.zIndex = '0';
      this.sidebarContainer.nativeElement.style.marginLeft = '25px';
    } else {
      this.sideBarIcons.nativeElement.style.zIndex = '2';
      this.sidebarContainer.nativeElement.style.marginLeft = '85px';
    }
  }

  getCountOfUnreadNotification() {
    this.jwtService.userRole$.pipe(takeUntil(this.destroySub)).subscribe((userRole) => {
      if (userRole !== this.adminRoleValue) {
        this.serviceUserMessages
          .getCountUnreadNotification()
          .pipe(takeUntil(this.destroy))
          .subscribe((response) => {
            this.serviceUserMessages.countOfNoReadeMessages = response;
          });
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
        if (this.drawer) {
          this.drawer.mode = 'side';
        }
      });
    }, 0);
    this.getCountOfUnreadNotification();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
