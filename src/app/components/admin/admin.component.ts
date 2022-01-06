import { Dosya } from './../../models/dosya';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { YuklemeservisService } from 'src/app/services/yuklemeservis.service';
import { EgitimservisService } from 'src/app/services/egitimservis.service';
import { egitimKayit } from 'src/app/models/egitimkayit';
import { egitimkayitSonuc } from 'src/app/models/egitimkayitsonuc';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  egitimler2: egitimKayit[];
  files: FileList;

  seckayit: egitimKayit = new egitimKayit();
  sonuc: egitimkayitSonuc = new egitimkayitSonuc();
  egitimler: any;
  admin: string;
  adminsonuc: boolean;

  constructor(
    public egitimkayitServis: EgitimservisService,
    public yuklemeservis: YuklemeservisService,
    public router: Router

  ) { }

  ngOnInit() {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.admin = user.uid;
    this.seckayit.key == null;
    this.AdminKontrol();
    this.dosyaListele();
  }

  AdminKontrol() {
    if (this.admin != "Jd6vPCjg88VPR7Bk1JhFrjIPlv73") {
      this.router.navigate(['/']);
    }
  }

  Duzenle(urun: Dosya) {
    Object.assign(this.seckayit, urun);
  }

  Sil(urun: Dosya) {
    this.egitimkayitServis.egitimKayitSil(urun.key).then(s => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.yuklemeservis.DosyaSil(urun);
    })
  }

  DosyaSec(e) {
    this.files = e.target.files;
  }
  DosyaYukle() {
    var file = this.files[0];
    var dosya = new Dosya();
    dosya.file = file;
    dosya.uid = this.admin;
    this.yuklemeservis.DosyaYukleStorage(dosya, this.seckayit.egitimAd, this.seckayit.egitimBilgi, this.seckayit.egitimKategori,
      this.seckayit.egitimFiyat, this.seckayit.egitimKisaBir, this.seckayit.egitimKisaIki, this.seckayit.egitimKisaUc, this.seckayit.egitimKisaDort, 
      this.seckayit.egitimKisaBes, this.seckayit.egitimKisaAlti).subscribe(p => {
        console.log("Yüklendi");
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";

      }, err => {
        console.log("Yüklenemedi");
      });
  }

  dosyaListele() {
    this.yuklemeservis.DosyaListele().snapshotChanges().subscribe(data => {
      this.egitimler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.egitimler.push(y as Dosya)
      })
    });
  }

  DosyaSil(dosya: Dosya) {
    this.yuklemeservis.DosyaSil(dosya);
  }

  Kaydet() {
    var tarih = new Date();
    if (this.seckayit.key == null) {

    }
    else {
      this.seckayit.duzTarih = tarih.getTime().toString();

      this.egitimkayitServis.egitimKayitDuzenle(this.seckayit).then(s => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }
}
