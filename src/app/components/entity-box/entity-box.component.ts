import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { CustomerCareService } from "../../services/customer-care.service";
import { Subscription } from "rxjs";
import { Branch } from "../../branch";
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
    this.triggerSelection();
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
      entity: this.selection.selected[0],
      date: this.customerService.getDate()
    });
  }

  triggerSelection() {
    setTimeout(() => {
      this.selected.emit({
        entity: this.selection.selected[0],
        date: this.customerService.getDate()
      });
    }, 1000);
  }
}
