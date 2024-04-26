import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: LoginPageComponent },
    { 
        path: 'home', 
        component: MainPageComponent, 
        children: [
            {
                path: 'profile/:username',
                component: ProfilePageComponent
            }
        ] 
    },
];
