import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { DashHome } from '../../shared/dash-home/dash-home';

@Component({
  selector: 'app-home',
  imports: [Header, DashHome],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {}
