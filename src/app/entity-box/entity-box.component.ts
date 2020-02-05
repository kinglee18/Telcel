import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2
} from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { CommentsService } from "../comments.service";
import { CustomerCareService } from "../customer-care.service";
import { Subscription } from "rxjs";
import { Branch } from "../branch";

@Component({
  selector: "app-entity-box",
  templateUrl: "./entity-box.component.html",
  styleUrls: ["./entity-box.component.scss"]
})
export class EntityBoxComponent implements OnDestroy {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Input() loading = true;
  @Input()
  set data(data: Array<Branch>) {
    this.dataSource.data = data;
  }
  
  subscription: Subscription;
  dataSource = new MatTableDataSource([]);
  centers: Array<Branch> = [];

  constructor(
    private commentsService: CommentsService,
    private customerService: CustomerCareService,
    private renderer: Renderer2
  ) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectedItem(element, event: any) {
    const rows: HTMLCollection =
      event.target.parentElement.parentElement.children;
    for (let x = 0; x < rows.length; x++) {
      this.renderer.removeClass(rows.item(x), "active");
    }
    this.renderer.addClass(event.target.parentElement, "active");

    this.selected.emit({
      entity: element,
      centers: this.centers,
      date: this.customerService.getDate()
    });
  }
}
