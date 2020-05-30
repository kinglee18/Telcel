import {
  Directive,
  ComponentFactory,
  ComponentRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import { NoSelectionComponent } from './no-selection/no-selection.component';


@Directive({
  selector: "[selection]"
})
export class NoSelectionDirective {
  loadingFactory: ComponentFactory<NoSelectionComponent>;
  loadingComponent: ComponentRef<NoSelectionComponent>;

  @Input()
  set selection(content: Array<any>) {
    this.viewRef.clear();
    console.log(111);
    
    if (content !== undefined && content.length === 0) {
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
      NoSelectionComponent
    );
    this.viewRef.createComponent(this.loadingFactory);
  }
}
