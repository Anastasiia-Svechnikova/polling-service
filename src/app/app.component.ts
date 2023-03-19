import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from './api.service';
import { PollingService } from './polling.service';
import { UnSubscriberComponent } from './unsubscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends UnSubscriberComponent implements OnInit {
  stopPolling$ = new Subject<void>();
  constructor(
    private pollingService: PollingService,
    private apiService: ApiService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.pollingService
      .doPolling(this.apiService.getPokemon())
      .pipe(takeUntil(this.destroyed$))
      .subscribe(console.log);
  }
}
