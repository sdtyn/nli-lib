import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideElement {
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        var children = this._elementRef.nativeElement.getElementsByTagName("*");
        if (!this.isElementAChildOf(targetElement, children)) {
            this.clickOutside.emit(event);
        }
    }

    private isElementAChildOf(targetElement, list):Boolean
    {
        var found:Boolean = false;
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if((targetElement.id && element.id && targetElement.id == element.id) || targetElement == element){
                found = true;
                break;
            }
        }
        return found;
    }
}