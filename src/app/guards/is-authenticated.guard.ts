import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStatus } from '../interfaces';
import { AuthService } from '../public/services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

const authService = inject( AuthService );

console.log({ status: authService.authStatus() });
if ( authService.authStatus() === AuthStatus.authenticated ){
    console.log('authenticated')
    return true;    
} else {
    console.log('not authenticated')
    return false
    }
};
