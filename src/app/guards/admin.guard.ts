import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router
    ) {

    }

    canActivate() {
        if (localStorage.getItem('dados-usuario') != null) {
            var json = JSON.parse(localStorage.getItem('dados-usuario') as string);
            return json.token != null;
        }

        this.router.navigate(['/acessar-conta']);
        return false;
    }
}