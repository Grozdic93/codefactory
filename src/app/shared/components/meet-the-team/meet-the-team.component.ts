import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-meet-the-team',
  standalone: true,
  imports: [],
  templateUrl: './meet-the-team.component.html',
  styleUrl: './meet-the-team.component.scss'
})
export class MeetTheTeamComponent {
  @Input({required:true}) title!:string;
  @Input({required:true}) team!:{fname:string, lname:string, img:string}[];

}
