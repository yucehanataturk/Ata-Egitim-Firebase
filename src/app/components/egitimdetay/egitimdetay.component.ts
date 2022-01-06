import { Component, OnInit } from '@angular/core';
import { Dosya } from './../../models/dosya';
import { Sepet } from 'src/app/models/sepet';
import { ActivatedRoute } from '@angular/router';
import { favoriEgitim } from 'src/app/models/favoriegitim';
import { SepetservisService } from 'src/app/services/sepetservis.service';
import { EgitimservisService } from 'src/app/services/egitimservis.service';
import { FavoriegitimservisService } from 'src/app/services/favoriegitimservis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-egitimdetay',
  templateUrl: './egitimdetay.component.html',
  styleUrls: ['./egitimdetay.component.css']
})
export class EgitimdetayComponent implements OnInit {

  uid: string;
  egitimID: string;
  egitimFotoUrl: string;
  egitimAd: string;
  egitimBilgi: string;
  egitimKategori: string;
  egitimFiyat: string;
  egitimKisaBir: string;
  egitimKisaIki: string;
  egitimKisaUc: string;
  egitimKisaDort: string;
  egitimKisaBes: string;
  egitimKisaAlti: string;
  kayTarih: string;
  duzTarih: string;


  key: string;
  secKayit: Dosya = new Dosya;
  secEgitimSepet: Sepet = new Sepet();
  secEgitimFavori: favoriEgitim = new favoriEgitim();


  constructor(
    public route: ActivatedRoute,
    public egitimServis: EgitimservisService,
    public favoriEgitimServis: FavoriegitimservisService,
    public sepetServis: SepetservisService,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.KayitGetir();
      var user: any = JSON.parse(localStorage.getItem("User"));
      this.uid = user.uid;
    });
    
  }

  KayitGetir() {
    this.egitimServis.KayitbyKey(this.key).snapshotChanges().subscribe(d => {
      var u = { ...(d.payload.toJSON() as Dosya), key: this.key };
      this.secKayit = u;
    });
    this.secKayit.duzTarih = this.duzTarih;
    if (this.secKayit.duzTarih === '') {
      this.secKayit.duzTarih = this.kayTarih;
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
