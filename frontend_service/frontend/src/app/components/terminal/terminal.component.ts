import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompileService } from '../../services/compile.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  standalone: true,
})
export class TerminalComponent implements OnDestroy {
  output: string = '';
  private subscription?: Subscription;

  constructor(private compileService: CompileService) {
    this.subscription = this.compileService.currentOutput.subscribe(
      (newOutput) => {
        this.output = newOutput ? newOutput : 'Successfully compiled';
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  clearOutput() {
    this.output = ''; // Clear the output
  }
}
