import { Component, OnInit } from '@angular/core';
import { Sepet } from './../../models/sepet';
import { SepetservisService } from 'src/app/services/sepetservis.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  toplam: number = 0;
  uid: string;
  egitimler: any;
  secUrunsepet: Sepet = new Sepet();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public egitimsepetServis: SepetservisService
  ) { }

  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem("User"));
    this.uid = user.uid;
    this.KayitListele();
  }
  KayitListele() {
    this.egitimsepetServis.KayitListelebyUid(this.uid).snapshotChanges().subscribe(data => {
      this.egitimler = [];
      data.forEach(satir => {
        var y = { ...satir.payload.toJSON(), key: satir.key };
        this.egitimler.push(y as Sepet)
      })
    });
  }
  btnSil(egitimSepet: Sepet) {
    this.egitimsepetServis.egitimKayitSil(egitimSepet.key).then(s => {
    });
    window.location.reload()
  }
  sepetToplam(toplamfiyat: string) {
    this.toplam = this.toplam + Math.max(parseFloat(toplamfiyat));
  }

}