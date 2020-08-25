import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryBrowserComponent } from './category-browser/category-browser.component';
import { ThreadBrowserComponent } from './thread-browser/thread-browser.component';

const routes: Routes = [
  { path: 'subcategory/:id', component: ThreadBrowserComponent },
  { path: '**', component: CategoryBrowserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
