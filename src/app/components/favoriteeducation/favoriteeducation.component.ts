import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { favoriEgitim } from 'src/app/models/favoriegitim';
import { FavoriegitimservisService } from 'src/app/services/favoriegitimservis.service';
import { egitimKayit } from 'src/app/models/egitimkayit';

@Component({
  selector: 'app-favoriteeducation',
  templateUrl: './favoriteeducation.component.html',
  styleUrls: ['./favoriteeducation.component.css']
})
export class FavoriteeducationComponent implements OnInit {

  egitim: favoriEgitim;
  key: string;
  uid: string;
  egitimler: any;
  favoriEgitim: number = 0;

  constructor(
    public route: ActivatedRoute,
    public refleshRoute: Router,
    public egitimFavoriServis: FavoriegitimservisService
  ) { }

  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
    this.KayitListele();
  }

  KayitListele() {
    this.egitimFavoriServis.KayitListelebyUid(this.uid).snapshotChanges().subscribe(data => {
      this.egitimler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.egitimler.push(y as favoriEgitim)
        this.favoriEgitim = this.favoriEgitim + 1;
      })
    });
  }

  btnSil(egitimFavori: favoriEgitim) {
    this.refresh()
    this.egitimFavoriServis.egitimKayitSil(egitimFavori.key).then(s => {
    })
  }

  refresh(){
    let currentUrl = this.refleshRoute.url;
    this.refleshRoute.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.refleshRoute.navigate([currentUrl]);
    });
  }
}
