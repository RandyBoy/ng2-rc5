import { Component, ApplicationRef, Input } from '@angular/core';


@Component({
    selector: 'test',
    template: '<h1>动态加载测试组件TestComponent</h1>'
})
export class TestComponent {
    @Input() loaderType: string;
    constructor(private appRef: ApplicationRef) {
        console.log(appRef);
    }
}

@Component({
    selector: 'dynamic',
    template: '<h1>动态加载测试组件DynamicComponent</h1>'
})
export class DynamicComponent {
    @Input() loaderType: string;
    constructor(private appRef: ApplicationRef) {
        console.log(appRef);
    }
}
