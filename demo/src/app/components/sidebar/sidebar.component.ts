import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-sidebar',
  imports: [UiModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
