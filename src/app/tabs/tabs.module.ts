import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Main tab navigation routes
export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'tab1', loadChildren: () => import('../tab1/tab1.routes').then(m => m.tab1Routes) },
      { path: 'tab2', loadChildren: () => import('../tab2/tab2.routes').then(m => m.tab2Routes) },
      { path: 'tab3', loadChildren: () => import('../tab3/tab3.routes').then(m => m.tab3Routes) },
      { path: 'privacy', loadChildren: () => import('../privacy/privacy.routes').then(m => m.privacyRoutes) },
      { path: '', redirectTo: 'tab1', pathMatch: 'full' }
    ]
  }
];