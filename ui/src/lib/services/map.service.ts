import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { EaseToOptions, FlyToOptions, Map as MlMap } from 'maplibre-gl';
import { Subject } from 'rxjs';
import { MapEventData, MapInitOptions, MapStyle } from '../interfaces/map.interface';

@Injectable()
export class MapService implements OnDestroy {
  private mapInstance?: MlMap;

  private readonly loadSubject = new Subject<MlMap>();
  readonly load$ = this.loadSubject.asObservable();

  private readonly errorSubject = new Subject<ErrorEvent>();
  readonly error$ = this.errorSubject.asObservable();

  constructor(private readonly zone: NgZone) {}

  init(container: HTMLElement, options: MapInitOptions): MlMap {
    this.destroy();

    const { style, ...rest } = options;

    this.zone.runOutsideAngular(() => {
      this.mapInstance = new MlMap({
        container,
        style: style as MapStyle,
        ...rest,
      });

      this.mapInstance!.on('load', () => {
        this.zone.run(() => this.loadSubject.next(this.mapInstance!));
      });

      this.mapInstance!.on('error', (e: ErrorEvent) => {
        this.zone.run(() => this.errorSubject.next(e));
      });
    });

    return this.mapInstance!;
  }

  getMap(): MlMap {
    if (!this.mapInstance) {
      throw new Error('Map Service: map is not initialized yet');
    }
    return this.mapInstance;
  }

  setStyle(style: MapStyle, diff = true): void {
    if (!this.mapInstance) return;
    this.mapInstance.setStyle(style, { diff });
  }

  isReady(): boolean {
    return !!this.mapInstance;
  }

  easeTo(options: EaseToOptions, eventData?: MapEventData) {
    if (!this.mapInstance) return;
    this.mapInstance.easeTo(options, eventData);
  }

  flyTo(options: FlyToOptions, eventData?: MapEventData) {
    if (!this.mapInstance) return;
    this.mapInstance.flyTo(options, eventData);
  }

  destroy(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
    this.loadSubject.complete();
    this.errorSubject.complete();
  }
}
