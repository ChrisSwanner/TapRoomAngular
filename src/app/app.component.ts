import { Component, OnInit } from '@angular/core';
import { Keg } from './models/keg.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  ngOnInit() {
    let interval = setInterval(() => {
      let currentTime = new Date();
      if (currentTime.getHours() === 17) {
        this.isHappyHour = true;
        for (let i = 0; i < this.kegs.length; i++) {
          let number = (this.kegs[i].price - (0.25 * this.kegs[i].price));
          this.kegs[i].salePrice = Math.round(number * 1e2) / 1e2;
         }
        } else if (currentTime.getHours() === 21) {
          this.isHappyHour = true;
          for (let i = 0; i < this.kegs.length; i++) {
            this.kegs[i].salePrice = 0;
          }
        }
      }, 1000);
  }

  public addingKeg: boolean = false;
  public kegFilter: boolean = false;
  public isHappyHour: boolean = false;
  currentTime = new Date();

  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  year: number = this.currentTime.getFullYear();
  selectedKeg = null;

  kegs: Keg[] = [
    new Keg('Angry Student IPA', 1, 13, 'IPA'),
    new Keg('Butt Crack of Dawn', 2, 9, 'Pilsner'),
    new Keg('Face Melter', 3, 5, 'Red Ale'),
    new Keg('Disappointed Teacher Hef', 3, 10, 'Hefeweizen')
  ];

  filteredKegs: Keg[] = [];


  finishedEditing() {
    this.selectedKeg = null;
  }

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  addNewKeg() {
    this.addingKeg = true;
  }

  sellPint(currentKeg) {
    if (currentKeg.pintsLeft > 0) {
      currentKeg.pintsLeft -= 1;
    } else if (currentKeg.pintsLeft === 0) {
      alert("All out");
    }
  }

  sellGrowler(currentKeg) {
    if (currentKeg.pintsLeft > 2) {
      currentKeg.pintsLeft -= 2;
    } else if ((currentKeg.pintsLeft < 2) && (currentKeg.pintsLeft > 0)) {
      alert("Not Enough Beer");
    } else if (currentKeg.pintsLeft === 0) {
      alert("All out")
    }
  }

  happyHour() {
    if (this.isHappyHour){
      this.isHappyHour = false;
      for (let i = 0; i < this.kegs.length; i++) {
        this.kegs[i].salePrice = 0;
      }
    } else {
      this.isHappyHour = true;
      for (let i = 0; i < this.kegs.length; i++) {
        let number = (this.kegs[i].price - (0.25 * this.kegs[i].price));
        this.kegs[i].salePrice = Math.round(number * 1e2) / 1e2;
      }
    }

  }

  sellBigGrowler(currentKeg) {
    if (currentKeg.pintsLeft > 4) {
      currentKeg.pintsLeft -= 4;
    } else if ((currentKeg.pintsLeft < 4)&&(currentKeg.pintsLeft > 0)) {
      alert("GET A SMALLER GROWLER");
    } else if (currentKeg.pintsLeft === 0) {
      alert("All out");
    }
  }

  alcoholContentColor(currentKeg) {
    if (currentKeg.empty === true) {
      return "doneEditing"
    }
    if(currentKeg.pintsLeft <= 10) {
      return "lowPints";
    } else if (currentKeg.price <= 5) {
      return "bg-info";
    } else if (currentKeg.price <= 9) {
      return "bg-warning";
    } else if (currentKeg.price <= 13) {
      return "bg-danger";
    } else if (currentKeg.price > 13) {
      return "bg-success";
    }
  }

  resetSale(currentKeg){
    currentKeg.onSale = false;
    currentKeg.salePrice = 0;
  }

  sale(currentKeg, percentage){
    currentKeg.onSale = true;
    let number = (currentKeg.price - (percentage * 0.01 * currentKeg.price));
    currentKeg.salePrice = Math.round(number * 1e2) / 1e2;
  }

  filterKegs(style){
    this.filteredKegs = [];
    this.kegFilter = true;
    for(let i = 0; i < this.kegs.length; i++){
      if(this.kegs[i].style === style){
        this.filteredKegs.push(this.kegs[i])
      }
    }
  }

  addKeg(description, alcoholContent, price, style) {
    this.addingKeg = false;
    let newKeg = new Keg(description, alcoholContent, price, style);
    this.kegs.push(newKeg);
  }
}
