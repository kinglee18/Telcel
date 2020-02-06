import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { CommentsService } from "../comments.service";
import { CustomerCareService } from "../customer-care.service";
import { Subscription } from "rxjs";
import { Branch } from "../branch";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-entity-box",
  templateUrl: "./entity-box.component.html",
  styleUrls: ["./entity-box.component.scss"]
})
export class EntityBoxComponent {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  selection: SelectionModel<any>;
  @Input() loading = true;
  @Input()
  set data(data: Array<Branch>) {
    this.selection = new SelectionModel<any>(false, []);
    this.dataSource.data = data;
    if (data.length) {this.selectedItem(data[0])};
  }

  subscription: Subscription;
  dataSource = new MatTableDataSource([]);

  constructor(private customerService: CustomerCareService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedItem(element) {
    this.selection.toggle(element);
    this.selected.emit({
      entity: element,
      date: this.customerService.getDate()
    });
  }
}
