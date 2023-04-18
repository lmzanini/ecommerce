import { Component } from '@angular/core';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css']
})
export class PainelAdminComponent {

  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
