import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { BlogsService } from './blogs.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardServiceService } from './leaderboard-service.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlayOnlineComponent } from './play-online/play-online.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { BoardComponent } from './board/board.component';
import { TauntsComponent } from './taunts/taunts.component';
import { UserLoginService } from './user-login.service';
import { SocketService } from './socket.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { BlogComponent } from './blog/blog.component';
import { PairingComponent } from './pairing/pairing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    LeaderboardComponent,
    PageNotFoundComponent,
    PlayOnlineComponent,
    ChessboardComponent,
    BoardComponent,
    TauntsComponent,
    BlogComponent,
    PairingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [BlogsService, ProfileService, LeaderboardServiceService,UserLoginService, SocketService,AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
