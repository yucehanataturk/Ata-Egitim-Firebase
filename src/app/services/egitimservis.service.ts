import { egitimKayit } from './../models/egitimkayit';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class EgitimservisService {

  private dbegitim = '/Egitimler';
  egitimkayitRef: AngularFireList<egitimKayit> = null;

  constructor(
    public egitimdb: AngularFireDatabase,
    public storage: AngularFireStorage

  ) {
    this.egitimkayitRef = egitimdb.list(this.dbegitim);
  }

  egitimKayitListele(): AngularFireList<egitimKayit> {
    return this.egitimkayitRef;
  }
  egitimKayitEkle(key: egitimKayit) {
    return this.egitimkayitRef.push(key);
  }
  egitimKayitDuzenle(egitim: egitimKayit): Promise<void> {
    return this.egitimkayitRef.update(egitim.key, egitim);
  }
  egitimKayitSil(key: string): Promise<void> {
    return this.egitimkayitRef.remove(key);
  }

  KayitListelebyUid(egitimKategori: string) {
    return this.egitimdb.list("Egitimler", q => q.orderByChild("egitimKategori").equalTo(egitimKategori));
  }

  KayitbyKey(key: string) {
    return this.egitimdb.object("Egitimler/" + key);
  }
}