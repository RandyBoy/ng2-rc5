import { Component, ApplicationRef, ComponentFactoryResolver, ViewContainerRef, NgModule, ComponentRef,
    ComponentFactory, OnInit, Injector, ComponentMetadata, ViewChild, Inject, Compiler, NgModuleRef } from '@angular/core';

import {ConcreteType, Type, stringify} from '@angular/core/src/facade/lang';
import {TestComponent, DynamicComponent} from './test';
import {Service1} from './Service1';
import {Service2} from './Service2';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
               <div id="test" #abc >这是个容器吧</div>
               <div><h1>Footer</h1></div>
               `,
    entryComponents: [TestComponent, DynamicComponent]

})
export class AppComponent implements OnInit {
    @ViewChild('abc', { read: ViewContainerRef }) contentTarget: ViewContainerRef;
    constructor(private appRef: ApplicationRef,
        @Inject(ComponentFactoryResolver) private cfr: ComponentFactoryResolver,
        private injector: Injector,
        private vcr: ViewContainerRef, private compiler: Compiler,
        private s1: Service1, private s2: Service2
    ) {
        s1.getName1();
        s2.getName2();
        console.log(appRef);
        console.log(appRef.components);
        console.log(appRef.componentTypes);
    }
    ngOnInit() {
        // let cf = this.cfr.resolveComponentFactory(TestComponent);
        // console.log(cf);
        // this.vcr.createComponent(cf);
        // cf.create(this.injector, [], "#test");
        // this.contentTarget.createComponent(createComponentFactory(this.cfr, DynamicComponent), 0);
        // const metadata = new ComponentMetadata({
        //     moduleId: module.id,
        //     selector: 'dynamic-component-load-html',
        //     template: '<h1>这是动态加生成的组件</h1>'
        // });
        // this.vcr.createComponent(createComponentFactory(this.cfr, DynamicComponent));
        // this.vcr.createComponent(createComponentFactory2(this.cfr, metadata));

        // cf.create(this.inject);
    }
    createModule<T>(
        moduleType: ConcreteType<T>, parentInjector: Injector = null): NgModuleRef<T> {
        return this.compiler.compileModuleSync(moduleType).create(parentInjector);
    }
    createComp<T>(
        compType: ConcreteType<T>, moduleType: ConcreteType<any>): ComponentRef<T> {
        let ngModule = this.createModule(moduleType);
        let cf = ngModule.componentFactoryResolver.resolveComponentFactory(compType);
        return cf.create(this.injector);
    }
    moduleType: any;
    createInjector(providers: any[], parent: Injector = null): Injector {
        @NgModule({ providers: providers })
        class SomeModule {
        }

        this.moduleType = SomeModule;
        return this.createModule(SomeModule, parent).injector;
    }
}


export function createComponentFactory2(resolver: ComponentFactoryResolver,
    metadata: ComponentMetadata): ComponentFactory<any> {
    const cmpClass = class DynamicComponent {
        login(modelValue: any): boolean {
            console.log("dynamicLoginComponent:" + JSON.stringify(modelValue));
            return false;
        }
    };
    metadata.entryComponents = [cmpClass];
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponentFactory(decoratedCmp);
}
export function createComponentFactory(resolver: ComponentFactoryResolver, component: any): ComponentFactory<any> {
    return resolver.resolveComponentFactory(component);
}
