import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-sidebar',
  imports: [UiModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly router = inject(Router);

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
