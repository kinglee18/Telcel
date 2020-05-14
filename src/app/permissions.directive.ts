import { Directive, ElementRef, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[hasPermission]'
})
export class PermissionsDirective {
  permissions = [];
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    for (const checkPermission of this.permissions) {
      if (this.authService.getUserPermissions().indexOf(checkPermission) > -1) {
        return true;
      }
    }
    return false;
  }
}
