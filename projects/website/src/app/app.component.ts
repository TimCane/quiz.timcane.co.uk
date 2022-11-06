import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { SettingsStateService } from './states/settings-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private router: Router, private location: Location, private settingsState: SettingsStateService) { }

  currentUrl: string = "";


  ngOnInit() {
    this.primengConfig.ripple = true;
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe({
        next: (event: any) => {
          var routerEvent = event as RouterEvent;
          this.currentUrl = routerEvent.url;
        }
      });
  }

  onHelp() {
    this.router.navigate(['help']);
  }

  onHome() {
    this.router.navigate(['menu']);
  }

  onSettings() {
    this.router.navigate(['settings']);
  }

  onBack() {
    this.location.back();
  }
}
