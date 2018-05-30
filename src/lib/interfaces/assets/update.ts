interface AssetUpdate {
  name: string;
  symbol?:string;
  address?:string;
  decimals?:number;
  description?:string;
  wallpaperUrl?: string;
  iconUrl?:string;
  email?: string;
  telegram?:string;
  twitter?:string;
  website?:string;
  whitepaper?:string;
  isDefault?: boolean;
}
