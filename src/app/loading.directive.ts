import {
  Directive,
  ComponentFactory,
  ComponentRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import { LoaderComponent } from "./loader/loader.component";

@Directive({
  selector: "[apploading]"
})
export class LoadingDirective {
  loadingFactory: ComponentFactory<LoaderComponent>;
  loadingComponent: ComponentRef<LoaderComponent>;

  @Input()
  set apploading(loading: boolean) {
    this.viewRef.clear();
    if (loading) {
      this.loadingComponent = this.viewRef.createComponent(this.loadingFactory);
    } else {
      this.viewRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(
      LoaderComponent
    );
    this.viewRef.createComponent(this.loadingFactory);
  }
}
