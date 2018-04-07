import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component'
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayOnlineComponent } from './play-online/play-online.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { PairingComponent } from './pairing/pairing.component';
//import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path:'blogs ',component:BlogComponent },
  { path:'profile/:id',component:ProfileComponent },
  { path:'play',component:ChessboardComponent },  
  { path:'leaderboard', component:LeaderboardComponent },
  { path:'test', component:PairingComponent },
  { path: '', component:LoginComponent},
  //{ path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

 }
