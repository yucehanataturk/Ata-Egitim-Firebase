import { Injectable } from '@angular/core';
import { Dosya } from './../models/dosya';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YuklemeservisService {

  private basePath = "/Egitimler";

  constructor(
    public db: AngularFireDatabase,
    public storage: AngularFireStorage
  ) {
  }
  DosyaYukleStorage(dosya: Dosya, egitimAd: string, egitimBilgi: string, egitimKategori: string,
    egitimFiyat: string, egitimKisaBir: string, egitimKisaIki: string, egitimKisaUc: string, 
    egitimKisaDort: string, egitimKisaBes: string, egitimKisaAlti: string) {
    var tarih = new Date();

    const dosyaYol = this.basePath + "/" + dosya.file.name;
    const storageRef = this.storage.ref(dosyaYol);
    const yukleTask = this.storage.upload(dosyaYol, dosya.file);
    dosya.egitimAd = egitimAd;
    dosya.egitimBilgi = egitimBilgi;
    dosya.egitimKategori = egitimKategori;
    dosya.egitimFiyat = egitimFiyat;
    dosya.egitimKisaBir = egitimKisaBir;
    dosya.egitimKisaIki = egitimKisaIki;
    dosya.egitimKisaUc = egitimKisaUc;
    dosya.egitimKisaDort = egitimKisaDort;
    dosya.egitimKisaBes = egitimKisaBes;
    dosya.egitimKisaAlti = egitimKisaAlti;
    dosya.kayTarih = tarih.getTime().toString();
    yukleTask.snapshotChanges().pipe(

      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadUrl => {
          dosya.url = downloadUrl;
          dosya.adi = dosya.file.name;
          this.DosyaVerileriKaydet(dosya);
        })
      })
    ).subscribe();

    return yukleTask.percentageChanges();

  }

  DosyaVerileriKaydet(dosya: Dosya) {
    this.db.list(this.basePath).push(dosya);

  }
  DosyaListele() {
    return this.db.list(this.basePath);
  }


  DosyaSil(dosya: Dosya) {
    this.DosyaVeriSil(dosya).then(() => {
      this.StorageSil(dosya);
    });
  }

  DosyaVeriSil(dosya: Dosya) {
    return this.db.list(this.basePath).remove(dosya.key);
  }

  StorageSil(dosya: Dosya) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(dosya.adi).delete();
  }
}