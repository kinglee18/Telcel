import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { authServiceStub } from './login/login.component.spec';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard, {
        provide: AuthService, useValue: authServiceStub
      }],
      imports: [RouterTestingModule.withRoutes([])]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
