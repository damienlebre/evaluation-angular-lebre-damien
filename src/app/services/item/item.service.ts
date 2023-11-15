import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Item, ItemHttp} from "../../models/item.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrlApi: string = environment.API_URL;

  private ressourceName: string = 'items'

  private fullBaseUrlApi: string;
  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = `${this.baseUrlApi}${this.ressourceName}`;
  }

  getAll(): Promise<Item[]> {
    // const token = this.authService.token as string;

    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`
    });

    const options = {headers}

    const obsHttp$ = this.http
      .get<ItemHttp[]>(`${this.fullBaseUrlApi}/`, options)
      .pipe(
        map((itemsHttp: ItemHttp[]) => itemsHttp.map((itemHttp: ItemHttp) => Item.mapperItemHttpToItem(itemHttp)))
      );

    return firstValueFrom(obsHttp$)
  }

  getById(id: number):Promise<Item> {
    // const token = this.authService.token as string;

    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`
    });

    const options = {headers}

    const obsHttp$ = this.http
      .get<ItemHttp>(`${this.fullBaseUrlApi}/${id}`, options)
      .pipe(
        map((itemHttp: ItemHttp) => Item.mapperItemHttpToItem(itemHttp))
      );

    return firstValueFrom(obsHttp$)
  }
}
