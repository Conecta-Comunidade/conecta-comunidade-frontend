import { Component, input } from '@angular/core';
import { cn } from '../../utils/tw-merge';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
})
export class Button {
  class = input('');

  classes() {
    return cn(
      'cursor-pointer text-sm md:text-base rounded-lg bg-blue-400 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-400/90',
      this.class(),
    );
  }
}
