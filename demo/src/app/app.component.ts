import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UiModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
