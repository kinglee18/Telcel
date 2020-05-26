import { GeneralBoard } from "./general-board";
import { async, TestBed } from "@angular/core/testing";
import { CustomerCareService } from "../services/customer-care.service";
import { CustomerCareServiceStub } from "../app.component.spec";

describe("GeneralBoard", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CustomerCareService,
          useValue: new CustomerCareServiceStub()
        }
      ]
    }).compileComponents();
  }));

  it("should create an instance", () => {
    let service = TestBed.get(CustomerCareService);
    expect(new GeneralBoard(service)).toBeTruthy();
  });
});
