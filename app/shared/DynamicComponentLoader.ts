import {Injectable, ResolvedReflectiveProvider, ReflectiveInjector, Component, ApplicationRef,
    ComponentFactoryResolver, ViewContainerRef, NgModule, ComponentRef,
    ComponentFactory, OnInit, Injector, ComponentMetadata, ViewChild, Inject, Compiler, NgModuleRef } from '@angular/core';
import {ConcreteType, Type, stringify, isPresent} from '@angular/core/src/facade/lang';

@Injectable()
export class DynamicComponentLoader {

    constructor(private injector: Injector, private compiler: Compiler) { }

    createModule<T>(
        moduleType: ConcreteType<T>, parentInjector: Injector = null): NgModuleRef<T> {
        return this.compiler.compileModuleSync(moduleType).create(parentInjector);
    }

    createComp<T>(compType: ConcreteType<T>, moduleType: ConcreteType<any>): ComponentRef<T> {
        let ngModule = this.createModule(moduleType);
        let componentFactory = ngModule.componentFactoryResolver.resolveComponentFactory(compType);
        return componentFactory.create(this.injector);
    }

    // moduleType: any;
    createInjector(providers: any[], entryComponents: any[], parent: Injector = null): Injector {
        @NgModule({ providers: providers, entryComponents: entryComponents })
        class SomeModule {
        }
        // this.moduleType = SomeModule;
        return this.createModule(SomeModule, parent).injector;
    }

    createComponentFactory(resolver: ComponentFactoryResolver, component: any): ComponentFactory<any> {
        return resolver.resolveComponentFactory(component);
    }

    loadAsRoot(
        type: Type, overrideSelectorOrNode: string | any, injector: Injector, onDispose?: () => void,
        projectableNodes?: any[][]): Promise<ComponentRef<any>> {
        return this.compiler
            .compileComponentAsync(<any>type)
            .then(componentFactory => {
                let componentRef = componentFactory.create(
                    injector, projectableNodes,
                    isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
                if (isPresent(onDispose)) {
                    componentRef.onDestroy(onDispose);
                }
                return componentRef;
            });
    }

    loadNextToLocation(type: Type,
        location: ViewContainerRef,
        providers: ResolvedReflectiveProvider[] = null,
        projectableNodes: any[][] = null): Promise<ComponentRef<any>> {
        return this.compiler
            .compileComponentAsync(<any>type)
            .then(componentFactory => {
                let contextInjector = location.parentInjector;
                let childInjector = isPresent(providers) && providers.length > 0 ?
                    ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                    contextInjector;
                return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
            });
    }

}


