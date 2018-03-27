export class Keg {
  public empty: boolean = false;
  public pintsLeft: number = 124;
  public onSale: boolean = false;
  public salePrice: number = 0;
  constructor(public description:string, public alcoholContent: number, public price: number, public style: string) {
  }
}
