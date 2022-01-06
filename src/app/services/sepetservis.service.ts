import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Sepet } from '../models/sepet';

@Injectable({
  providedIn: 'root'
})
export class SepetservisService {

  private dbegitimSepet = '/Sepet';
  egitimSepetRef: AngularFireList<Sepet> = null;

  constructor(
    public egitimdb: AngularFireDatabase

  ) {
    this.egitimSepetRef = egitimdb.list(this.dbegitimSepet);
  }

  egitimKayitListele(): AngularFireList<Sepet> {
    return this.egitimSepetRef;
  }
  egitimKayitEkle(key: Sepet) {
    return this.egitimSepetRef.push(key);
  }
  egitimKayitDuzenle(egitim: Sepet): Promise<void> {
    return this.egitimSepetRef.update(egitim.key, egitim);
  }
  egitimKayitSil(key: string): Promise<void> {
    return this.egitimSepetRef.remove(key);
  }


  KayitListelebyUid(egitimKategori: string) {
    return this.egitimdb.list("Sepet", q => q.orderByChild("uid").equalTo(egitimKategori));
  }

  KayitbyKey(key: string) {
    return this.egitimdb.object("Sepet/" + key);
  }
}
