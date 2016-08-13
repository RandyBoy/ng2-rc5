import {  NgModule, Injector, Compiler, NgModuleRef, ComponentRef } from '@angular/core';

import {ConcreteType, Type, stringify} from '@angular/core/src/facade/lang';

export function createModule<T>(compiler: Compiler,
    moduleType: ConcreteType<T>, parentInjector: Injector = null): NgModuleRef<T> {
    return compiler.compileModuleSync(moduleType).create(parentInjector);
}

export function createComp<T>(injector: Injector,
    compType: ConcreteType<T>, moduleType: ConcreteType<any>): ComponentRef<T> {
    let ngModule = this.createModule(moduleType);
    var cf = ngModule.componentFactoryResolver.resolveComponentFactory(compType);
    return cf.create(injector);
}
export function createInjector(providers: any[], parent: Injector = null): Injector {
    @NgModule({ providers: providers })
    class SomeModule {
    }
    // moduleType = SomeModule;

    return createModule(null, SomeModule, parent).injector;
}