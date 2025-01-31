import { StickyScrollDirective } from './sticky-scroll.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('StickyScrollDirective', () => {
  it('should create an instance', () => {

    const elementRefMock = new ElementRef(document.createElement('div'));


    const renderer2Mock = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass', 'setStyle']);


    const directive = new StickyScrollDirective(elementRefMock, renderer2Mock);


    expect(directive).toBeTruthy();
  });
});
