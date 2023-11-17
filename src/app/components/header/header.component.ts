import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faRightToBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isConnected$? : Observable<boolean>


  iconSignout : IconDefinition = faRightToBracket

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.isConnected$ = this.authService
      .token$
      .pipe(
        map((token: string | undefined)=> Boolean(token))
      )
  }

  onClickSignOut() {
    this.authService.signOut()
    this.router.navigateByUrl('/auth/signin')

  }
}
