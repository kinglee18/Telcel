import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
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
export class EntityBoxComponent implements OnInit, OnDestroy {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  subscription: Subscription;
  dataSource = new MatTableDataSource([]);
  centers: Array<Branch> = [];
  loading = true;
  constructor(
    private commentsService: CommentsService,
    private customerService: CustomerCareService
  ) {}

  ngOnInit() {
    this.subscription = this.customerService.branchesChanged$.subscribe(
      centers => {
        this.loading = true;
        this.centers = centers;
        this.commentsService
          .getEntites(centers, this.customerService.getDate())
          .subscribe(entities => {
            this.dataSource.data = entities["entities"];
            this.loading = false;
          });
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectedItem(element) {
    this.selected.emit({
      entity: element,
      centers: this.centers,
      date: this.customerService.getDate()
    });
  }
}
