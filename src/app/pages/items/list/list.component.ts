import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Item} from "../../../models/item.model";
import {ItemService} from "../../../services/item/item.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  items$?: Promise<Item[]>

  constructor(private itemService: ItemService) {
  }
  ngOnInit() {
    this.items$ = this.itemService.getAll()
  }

}
