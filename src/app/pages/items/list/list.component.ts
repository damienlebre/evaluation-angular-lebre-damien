import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, map, Observable} from "rxjs";
import {Item} from "../../../models/item.model";
import {ItemService} from "../../../services/item/item.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  items$?: Observable<Item[]>
  selectedItemDeleteConfirmation? : Item
  showDeleteSuccessToast : boolean = false
  showAddSuccessToast : boolean = false
  showEditSuccessToast : boolean = false
  selectedItemForEdition?: Item
  itemForm?: FormGroup

  private searchFilterText$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)
  constructor(private itemService: ItemService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.items$ = this.getItemsFiltered()
  }

  onInputSearchFilter(evt: any):void {
    const searchText = evt.target.value
    this.searchFilterText$.next(searchText)
  }

  private getItemsFiltered(): Observable<Item[]> {
    return combineLatest([
      this.itemService.getAll(),
      this.searchFilterText$
    ])
      .pipe(
        debounceTime(400),
        map(([items, searchText]) => {
          if(searchText) {
            return items.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase()) )
          }
          return items
        })
      )
  }

  onClickAddItem(modalItemForm: any): void {
    this.initItemForm();

    const modal = this.modalService.open(modalItemForm, {centered:true});
    modal.result
      .then(() => {
        const itemForm: Item = { ...this.itemForm?.value };

        this.itemService.add(itemForm)
          .then(() => {
            this.showAddSuccessToast = true
            this.items$ = this.getItemsFiltered()
            modal.close();
          });
      })
      .catch(() => {
        modal.dismiss();
      });
  }


  onClickEditItem(modalItemFrom: any, itemToEdit: Item): void {
    this.initItemForm(itemToEdit);
    this.selectedItemForEdition = itemToEdit;

    const modal = this.modalService.open(modalItemFrom, {centered:true});
    modal.result
      .then(() => {
        const itemForm: Item = { ...this.itemForm?.value };
        this.itemService.edit(itemToEdit.id, itemForm)
          .then(() => {
            this.showEditSuccessToast = true
            this.items$ = this.getItemsFiltered()
            modal.close();
          });
      })
      .catch(() => {
        this.selectedItemForEdition = undefined;
        modal.dismiss();
      });
  }

  onSubmitItemForm(modal: any): void{
    if (this.itemForm?.valid){
      modal.close('itemFormSubmitted');
    }

  }
  onClickDeleteItem(modalDeleteItem: any, item: Item){

    this.selectedItemDeleteConfirmation = item

    const modal = this.modalService.open(modalDeleteItem, {centered:true})

    modal.result
      .then(()=>{
        this.itemService
          .deleteById(item.id)
          .then(()=>{
            this.showDeleteSuccessToast = true
            this.items$ = this.getItemsFiltered()
          })
      })
      .catch(()=>{})
  }


  private initItemForm(itemToEdit?: Item): void{
    this.itemForm = this.fb.group({
      name:[itemToEdit ? itemToEdit.name : undefined, [Validators.required, Validators.minLength(2)]],
      description: [itemToEdit ? itemToEdit.description : undefined, [Validators.required]],
      rarity: [itemToEdit ? itemToEdit.rarity : undefined, [Validators.required]],
      carryLimit: [itemToEdit ? itemToEdit.carryLimit : undefined, [Validators.required]],
      value: [itemToEdit ? itemToEdit.value : undefined, [Validators.required]]
    })
  }



}
