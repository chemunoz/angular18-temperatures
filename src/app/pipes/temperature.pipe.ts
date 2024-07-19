import { Pipe, PipeTransform } from '@angular/core';
import { Measure } from './measure.enum';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: string | number,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ): unknown {
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    // Temperature conversion
    let outputTemperature: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemperature = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemperature = (val - 32) * (5 / 9);
    } else {
      outputTemperature = val;
    }

    // Symbol
    let symbol: Measure;
    if (!outputType) {
      symbol = inputType === 'cel' ? Measure.Celsius : Measure.Fahrenheit;
    } else {
      symbol = outputType === 'cel' ? Measure.Celsius : Measure.Fahrenheit;
    }

    return `${outputTemperature.toFixed(2)} ${symbol}`;
  }
}
