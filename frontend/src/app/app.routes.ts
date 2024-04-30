import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectFilesPageComponent } from './pages/project-files-page/project-files-page.component';
import { ProjectOptionsPageComponent } from './pages/project-options-page/project-options-page.component';

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
            },
            {
                path: 'project/:id/:name',
                component: ProjectPageComponent,
                children: [
                    //{ path: '',   redirectTo: '/auth', pathMatch: 'full' },
                    {
                        path: '',
                        component: ProjectOptionsPageComponent
                    },
                    {
                        path: 'files',
                        component: ProjectFilesPageComponent
                    }
                ]
            }
        ] 
    },
];
