import {Component, OnInit} from '@angular/core';
import {Item} from "../../../models/item.model";
import {ItemService} from "../../../services/item/item.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  items$?: Promise<Item>

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id =this.route.snapshot.paramMap.get('id')
    if (id){
      this.items$ = this.itemService.getById(parseInt(id))
    }else {
      this.router.navigateByUrl('/not-found')
    }
  }

}
