import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { EaseToOptions, FlyToOptions, Map as MlMap } from 'maplibre-gl';
import { Observable, Subject } from 'rxjs';
import { MapEventData, MapInitOptions, MapStyle } from '../interfaces/map.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnDestroy {
  private maps = new Map<string, MlMap>();
  private loadSubjects = new Map<string, Subject<MlMap>>();
  private readonly errorSubject = new Subject<ErrorEvent>();
  readonly error$ = this.errorSubject.asObservable();

  constructor(private readonly zone: NgZone) {}

  init(container: HTMLElement, options: MapInitOptions, mapId = 'default'): MlMap {
    this.destroy(mapId);

    const { style, ...rest } = options;
    const loadSubject = new Subject<MlMap>();
    this.loadSubjects.set(mapId, loadSubject);

    let mapInstance: MlMap = null!;
    this.zone.runOutsideAngular(() => {
      mapInstance = new MlMap({
        container,
        style: style as MapStyle,
        ...rest,
      });

      mapInstance.on('load', () => {
        this.zone.run(() => loadSubject.next(mapInstance));
      });

      mapInstance.on('error', (e: ErrorEvent) => {
        this.zone.run(() => this.errorSubject.next(e));
      });
    });

    this.maps.set(mapId, mapInstance);
    return mapInstance;
  }

  getMap(mapId = 'default'): MlMap {
    const map = this.maps.get(mapId);
    if (!map) {
      throw new Error(`MapService: map "${mapId}" is not initialized yet`);
    }
    return map;
  }

  load$(mapId = 'default'): Observable<MlMap> {
    let subject = this.loadSubjects.get(mapId);
    if (!subject) {
      subject = new Subject<MlMap>();
      this.loadSubjects.set(mapId, subject);
    }
    return subject.asObservable();
  }

  isReady(mapId = 'default'): boolean {
    return this.maps.has(mapId);
  }

  setStyle(style: MapStyle, mapId = 'default', diff = true): void {
    if (!this.isReady(mapId)) return;
    this.getMap(mapId).setStyle(style, { diff });
  }

  easeTo(options: EaseToOptions, mapId = 'default', eventData?: MapEventData) {
    if (!this.isReady(mapId)) return;
    this.getMap(mapId).easeTo(options, eventData);
  }

  flyTo(options: FlyToOptions, mapId = 'default', eventData?: MapEventData) {
    if (!this.isReady(mapId)) return;
    this.getMap(mapId).flyTo(options, eventData);
  }

  destroy(mapId = 'default'): void {
    const map = this.maps.get(mapId);
    if (map) {
      map.remove();
      this.maps.delete(mapId);
    }
    const loadSubject = this.loadSubjects.get(mapId);
    if (loadSubject) {
      loadSubject.complete();
      this.loadSubjects.delete(mapId);
    }
  }

  ngOnDestroy(): void {
    this.maps.forEach((_, mapId) => this.destroy(mapId));
    this.errorSubject.complete();
  }
}
