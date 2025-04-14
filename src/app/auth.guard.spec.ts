import { TestBed } from '@angular/core/testing';


import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);  // Instanciamos el guard correctamente
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

