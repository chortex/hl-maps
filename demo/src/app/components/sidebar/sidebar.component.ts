import { Component } from '@angular/core';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-sidebar',
  imports: [UiModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
