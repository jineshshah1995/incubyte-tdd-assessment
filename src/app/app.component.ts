import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule, CommonModule],
})
export class AppComponent {
  model = { input: '' };
  output = 0;
  errorMessage = '';

  onSubmit(): void {
    try {
      this.output = this.add(this.model.input);
    } catch (error) {
      this.errorMessage = `${error}`;
    }
  }

  add(numbersString: string): number {
    const res = 0;
    let delimiter = ',';
    let containsUnsupportedDelimiter = false;
    if (numbersString === '') return res;
    if (numbersString.startsWith('//')) {
      const parts = numbersString.split('\n');
      delimiter = parts[0].substring(2);
      numbersString = parts[1];
      containsUnsupportedDelimiter = numbersString
        .split('')
        .some(
          (char) => !char.match(/[0-9]/) && char !== delimiter && char !== '-'
        );
    }

    if (containsUnsupportedDelimiter) {
      throw new Error('The input contains unsupported delimiters.');
    }
    const numbersArray = numbersString
      .replace(/\\n/g, '\n')
      .split(new RegExp(`[${delimiter}\n]`));
    const negativeNumbers = numbersArray.filter((num) => parseInt(num) < 0);

    if (negativeNumbers.length > 0) {
      throw new Error(
        `negative numbers not allowed ${negativeNumbers.join(',')}`
      );
    }

    return numbersArray.reduce((sum, num) => sum + parseInt(num), 0);
  }

  title = 'incubyte-tdd-assessment';
}
