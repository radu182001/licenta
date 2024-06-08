import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectFilesPageComponent } from './pages/project-files-page/project-files-page.component';
import { ProjectOptionsPageComponent } from './pages/project-options-page/project-options-page.component';
import { ArrangePageComponent } from './pages/arrange-page/arrange-page.component';
import { LyricsPageComponent } from './pages/lyrics-page/lyrics-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { InvitePageComponent } from './pages/invite-page/invite-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

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
                    },
                    {
                        path: 'arrange',
                        component: ArrangePageComponent
                    },
                    {
                        path: 'lyrics',
                        component: LyricsPageComponent
                    },
                    {
                        path: 'settings',
                        component: SettingsPageComponent
                    },
                    {
                        path: 'chat',
                        component: ChatPageComponent
                    }
                ]
            },
            {
                path: 'invite/:token',
                component: InvitePageComponent
            }
        ] 
    },
];
