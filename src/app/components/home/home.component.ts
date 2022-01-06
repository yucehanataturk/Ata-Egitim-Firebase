import { egitimkayitSonuc } from './../../models/egitimkayitsonuc';
import { SepetservisService } from './../../services/sepetservis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Sepet } from 'src/app/models/sepet';
import { egitimKayit } from 'src/app/models/egitimkayit';
import { EgitimservisService } from 'src/app/services/egitimservis.service';
import { FavoriegitimservisService } from 'src/app/services/favoriegitimservis.service';
import { favoriEgitim } from 'src/app/models/favoriegitim';
import { Uye } from 'src/app/models/uye';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  key: string;
  uid: string;
  egitimID: string;
  egitimFotoUrl: string;
  egitimFotoAdi: string;
  egitimFile: File;
  egitimAd: string;
  egitimBilgi: string;
  egitimKategori: string;
  egitimFiyat: string;
  kayTarih: string;
  duzTarih: string;

  egitimler;
  sonucsepet: boolean = false;
  filtre: string = "";
  secKayit: egitimKayit = new egitimKayit();
  sonuc: egitimkayitSonuc = new egitimkayitSonuc();
  secEgitimSepet: Sepet = new Sepet();
  secEgitimFavori: favoriEgitim = new favoriEgitim();

  constructor(
    public egitimKayitServis: EgitimservisService,
    public sepetServis: SepetservisService,
    public favoriEgitimServis: FavoriegitimservisService,
    public router: Router,
    public route: ActivatedRoute,
    public toast: ToastrService

  ) { }

  ngOnInit() {
    this.egitimKayitListele();
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
  }

  egitimKayitListele() {
    this.egitimKayitServis.egitimKayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.egitimler = data;
    });

  }

  egitimKayitListeleFiltre() {
    if (this.filtre != "") {
      this.egitimKayitServis.KayitListelebyUid(this.filtre).snapshotChanges().subscribe(data => {
        this.egitimler = [];
        data.forEach(egitim => {
          var y = { ...egitim.payload.toJSON(), key: egitim.key };
          this.egitimler.push(y as egitimKayit)
        })
      });
    }
    else {
      this.egitimKayitListele();
    }
  }

  SepeteEkle() {
    this.secEgitimSepet.egitimID = this.egitimID
    this.secEgitimSepet.uid = this.uid;
    this.secEgitimSepet.egitimFotoUrl = this.egitimFotoUrl;
    this.secEgitimSepet.egitimAd = this.egitimAd;
    this.secEgitimSepet.egitimBilgi = this.egitimBilgi;
    this.secEgitimSepet.egitimKategori = this.egitimKategori;
    this.secEgitimSepet.egitimFiyat = this.egitimFiyat;
    this.secEgitimSepet.kayTarih = this.kayTarih;

    if (this.secEgitimSepet.key == null) {
      this.sepetServis.egitimKayitEkle(this.secEgitimSepet).then(s => {
      });
    }
  }

  FavoriyeEkle() {
    this.secEgitimFavori.uid = this.uid;
    this.secEgitimFavori.egitimID = this.egitimID;
    this.secEgitimFavori.egitimFotoUrl = this.egitimFotoUrl;
    this.secEgitimFavori.egitimAd = this.egitimAd;
    this.secEgitimFavori.egitimBilgi = this.egitimBilgi;
    this.secEgitimFavori.egitimKategori = this.egitimKategori;
    this.secEgitimFavori.egitimFiyat = this.egitimFiyat;
    this.secEgitimFavori.kayTarih = this.kayTarih;

    if (this.secEgitimFavori.key == null) {
      this.favoriEgitimServis.egitimKayitEkle(this.secEgitimFavori).then(s => {

      });
    }
  }

   ToastSepet() {
    this.toast.success("Sepete Eklendi", this.secEgitimSepet.egitimAd);
   }
   ToastFavori() {
    this.toast.success("Favoriye Eklendi", this.secEgitimFavori.egitimAd);
  }
}