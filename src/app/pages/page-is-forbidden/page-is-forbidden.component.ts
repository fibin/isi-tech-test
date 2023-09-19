import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-is-forbidden',
  templateUrl: './page-is-forbidden.component.html',
  styleUrls: ['./page-is-forbidden.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageIsForbiddenComponent {

  constructor(
    private router: Router
  ) {}

  goToHome(): void {
    this.router.navigate(['user-list']);
  }

}
