import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WalletTypeItem} from "../../_model/WalletType/walletTypeItem";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletTypeService {
  baseUrl = environment.apiUrl + 'WalletType/';

  constructor(private http: HttpClient) { }

  GetAllWalletList() {
    return this.http.get<WalletTypeItem[]>(this.baseUrl + 'get-all-type');
  }
}
