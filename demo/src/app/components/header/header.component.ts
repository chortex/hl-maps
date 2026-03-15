import { Component } from '@angular/core';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-header',
  imports: [UiModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  ghLink = 'https://github.com/chortex/hl-maps';
  target = '_blank';
}
