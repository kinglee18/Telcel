import { TestBed } from "@angular/core/testing";
import { CustomerCareService } from "./customer-care.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CustomerCareService", () => {
  let service: CustomerCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(CustomerCareService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a list of id's from offices", done => {
    service.selectBranches([
      { id: "1", name: "a" },
      { id: "2", name: "b" },
      { id: "3", name: "c" }
    ]);
    service.branchesChanged$.subscribe(data => {
      expect(data).toEqual("1,2,3");
      done();
    });
  });
});
