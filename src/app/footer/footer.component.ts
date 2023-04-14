import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mediaData: any[] = [];

  // Declaração da constante com o token de acesso
  private readonly ACCESS_TOKEN = 'IGQVJVeHRmekpsLWE2Nm9LY0lhcGx1eHFPTG5MQ2FubF9lYWQyUUxXWW5aU2hoWldUdHlwNXFkSWFXNXRQVGlLeTJzanFhR1hIZA1MzVDA5V2x3ZAVV1OFdFZAmJzdkQ1REhyRlkzOExhMUlGOVNNeWxLVgZDZD';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Utilização da constante no URL da API
    const apiURL = `https://graph.instagram.com/me/media?access_token=${this.ACCESS_TOKEN}&fields=media_url,media_type,caption,permalink`;
    this.http.get(apiURL)
      .subscribe(
        (response: any) => {
          this.mediaData = response.data;
          console.log(response.data);

        },
        (error) => {
          console.log(error);
        }
      );
  }

}
