import { Directive, Input, ComponentFactory, ComponentRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { EmptyComponent } from './empty/empty.component';

@Directive({
  selector: '[empty]'
})
export class EmptyDirective {
  fact: ComponentFactory<EmptyComponent>;
  emptyComponent: ComponentRef<EmptyComponent>;
  @Input()
  set empty(content: Array<any>) {
    this.viewRef.clear();
    if (!content.length) {
      this.emptyComponent = this.viewRef.createComponent(this.fact);
    } else {
      this.viewRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    this.fact = this.componentFactoryResolver.resolveComponentFactory(
      EmptyComponent
    );
    this.viewRef.createComponent(this.fact);
  }

}
