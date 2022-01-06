import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { favoriEgitim } from '../models/favoriegitim';

@Injectable({
  providedIn: 'root'
})
export class FavoriegitimservisService {
  private dbegitimFavori = '/FavoriEgitim';
  egitimFavoriRef: AngularFireList<favoriEgitim> = null;

  constructor(
    public egitimdb: AngularFireDatabase

  ) {
    this.egitimFavoriRef = egitimdb.list(this.dbegitimFavori);
  }

  egitimKayitListele(): AngularFireList<favoriEgitim> {
    return this.egitimFavoriRef;
  }
  egitimKayitEkle(key: favoriEgitim) {
    return this.egitimFavoriRef.push(key);
  }
  egitimKayitDuzenle(egitim: favoriEgitim): Promise<void> {
    return this.egitimFavoriRef.update(egitim.key, egitim);
  }
  egitimKayitSil(key: string): Promise<void> {
    return this.egitimFavoriRef.remove(key);
  }

  KayitListelebyUid(egitimKategori: string) {
    return this.egitimdb.list("FavoriEgitim", q => q.orderByChild("uid").equalTo(egitimKategori));
  }
  KayitbyKey(key: string) {
    return this.egitimdb.object("FavoriEgitim/" + key);
  }
}


