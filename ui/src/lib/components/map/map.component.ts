import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LngLatBoundsLike, Map as MlMap } from 'maplibre-gl';
import { MapInitOptions, MapStyle } from '../../interfaces/map.interface';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'hl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  standalone: true,
})
export class HlMapComponent implements AfterViewInit, OnDestroy {
  private readonly mapService = inject(MapService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('container', { static: true })
  private containerRef!: ElementRef<HTMLDivElement>;

  readonly style = input.required<MapStyle>();
  readonly mapId = input<string>('default');

  // Base map options
  readonly center = input<[number, number] | undefined>();
  readonly zoom = input<number | undefined>();
  readonly bearing = input<number | undefined>();
  readonly pitch = input<number | undefined>();
  readonly hash = input<boolean | string | undefined>();

  // camera limits
  readonly minZoom = input<number | undefined>();
  readonly maxZoom = input<number | undefined>();
  readonly minPitch = input<number | undefined>();
  readonly maxPitch = input<number | undefined>();

  // bounds
  readonly maxBounds = input<LngLatBoundsLike | undefined>();

  // interactive options
  readonly interactive = input<boolean | undefined>();
  readonly scrollZoom = input<boolean | undefined>();
  readonly dragPan = input<boolean | undefined>();
  readonly dragRotate = input<boolean | undefined>();
  readonly doubleClickZoom = input<boolean | undefined>();
  readonly boxZoom = input<boolean | undefined>();
  readonly keyboard = input<boolean | undefined>();
  readonly touchZoomRotate = input<boolean | undefined>();

  readonly mapLoad = output<MlMap>();
  readonly mapError = output<ErrorEvent>();

  private readonly styleEffect = effect(() => {
    const style = this.style();
    const mapId = this.mapId();
    if (this.mapService.isReady(mapId)) {
      this.mapService.setStyle(style, mapId);
    }
  });

  ngAfterViewInit(): void {
    const mapId = this.mapId();
    const style = this.style();

    const center = this.center();
    const zoom = this.zoom();
    const bearing = this.bearing();
    const pitch = this.pitch();
    const hash = this.hash();

    const minZoom = this.minZoom();
    const maxZoom = this.maxZoom();
    const minPitch = this.minPitch();
    const maxPitch = this.maxPitch();

    const maxBounds = this.maxBounds();

    const interactive = this.interactive();
    const scrollZoom = this.scrollZoom();
    const dragPan = this.dragPan();
    const dragRotate = this.dragRotate();
    const doubleClickZoom = this.doubleClickZoom();
    const boxZoom = this.boxZoom();
    const keyboard = this.keyboard();
    const touchZoomRotate = this.touchZoomRotate();

    const options: MapInitOptions = {
      style,

      ...(center && { center }),
      ...(zoom != null && { zoom }),
      ...(bearing != null && { bearing }),
      ...(pitch != null && { pitch }),
      ...(hash != null && { hash }),

      ...(minZoom != null && { minZoom }),
      ...(maxZoom != null && { maxZoom }),
      ...(minPitch != null && { minPitch }),
      ...(maxPitch != null && { maxPitch }),

      ...(maxBounds && { maxBounds }),

      ...(interactive !== undefined && { interactive }),
      ...(scrollZoom !== undefined && { scrollZoom }),
      ...(dragPan !== undefined && { dragPan }),
      ...(dragRotate !== undefined && { dragRotate }),
      ...(doubleClickZoom !== undefined && { doubleClickZoom }),
      ...(boxZoom !== undefined && { boxZoom }),
      ...(keyboard !== undefined && { keyboard }),
      ...(touchZoomRotate !== undefined && { touchZoomRotate }),
    };

    const container = this.containerRef.nativeElement;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = this.mapService.init(container, options, mapId);

    this.mapService
      .load$(mapId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((m) => this.mapLoad.emit(m));

    this.mapService.error$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => this.mapError.emit(e));
  }

  ngOnDestroy(): void {
    this.mapService.destroy(this.mapId());
  }
}
