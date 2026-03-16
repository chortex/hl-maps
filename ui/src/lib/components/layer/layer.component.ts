import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { Map as MlMap } from 'maplibre-gl';
import { MapService } from '../../services/map.service';
import {
  HlLayerId,
  HlLayerType,
  HlLayerLayout,
  HlLayerPaint,
  HlLayerFilter,
  HlSourceLayerSpecification,
} from '../../interfaces/layer.interface';

@Component({
  selector: 'hl-layer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HlLayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  private readonly mapService = inject(MapService);

  readonly mapId = input<string>('default');
  readonly id = input.required<HlLayerId>();
  readonly sourceId = input.required<string>();
  readonly type = input.required<HlLayerType>();
  readonly sourceLayer = input<string | undefined>();
  readonly minzoom = input<number | undefined>();
  readonly maxzoom = input<number | undefined>();
  readonly layout = input<HlLayerLayout | undefined>();
  readonly paint = input<HlLayerPaint | undefined>();
  readonly filter = input<HlLayerFilter | undefined>();
  readonly beforeId = input<string | undefined>();

  private layerAdded = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.initLayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLayerOnChanges(changes);
  }

  private initLayer(): void {
    const mapId = this.mapId();
    if (!this.mapService.isReady(mapId)) {
      console.warn('[HlLayer] map is not ready for layer', this.id(), 'mapId:', mapId);
      return;
    }

    const map = this.mapService.getMap(mapId);

    if (map.isStyleLoaded()) {
      this.addLayer(map);
    } else {
      this.waitForMapLoad(map);
    }
  }

  private waitForMapLoad(map: MlMap): void {
    const onLoad = () => {
      this.addLayer(map);
      map.off('load', onLoad);
    };

    map.on('load', onLoad);
  }

  private addLayer(map: MlMap): void {
    if (this.layerAdded) return;

    const spec = this.buildLayerSpec();

    if (!map.getLayer(spec.id)) {
      map.addLayer(spec, this.beforeId());
      this.layerAdded = true;
    }
  }

  private buildLayerSpec(): HlSourceLayerSpecification {
    const id = this.id();
    const sourceId = this.sourceId();
    const type = this.type();

    const layer: HlSourceLayerSpecification = {
      id,
      source: sourceId,
      type,
    } as HlSourceLayerSpecification;

    const sourceLayer = this.sourceLayer();
    if (sourceLayer) layer['source-layer'] = sourceLayer;

    const minzoom = this.minzoom();
    if (minzoom != null) layer.minzoom = minzoom;

    const maxzoom = this.maxzoom();
    if (maxzoom != null) layer.maxzoom = maxzoom;

    const layout = this.layout();
    if (layout) layer.layout = layout;

    const paint = this.paint();
    if (paint) layer.paint = paint;

    const filter = this.filter();
    if (filter) layer.filter = filter;

    return layer;
  }

  private updateLayerOnChanges(changes: SimpleChanges): void {
    const mapId = this.mapId();
    if (!this.mapService.isReady(mapId) || !this.layerAdded) return;

    const map = this.mapService.getMap(mapId);
    const id = this.id();
    if (!map.getLayer(id)) return;

    if (changes['layout']) {
      const layout = this.layout();
      if (layout) {
        Object.entries(layout).forEach(([prop, value]) => {
          map.setLayoutProperty(id, prop, value);
        });
      }
    }

    if (changes['paint']) {
      const paint = this.paint();
      if (paint) {
        Object.entries(paint).forEach(([prop, value]) => {
          map.setPaintProperty(id, prop, value);
        });
      }
    }

    if (changes['filter']) {
      const filter = this.filter();
      map.setFilter(id, filter ?? undefined);
    }

    if (changes['minzoom'] || changes['maxzoom']) {
      const minzoom = this.minzoom();
      const maxzoom = this.maxzoom();

      const layer = map.getLayer(id) as HlSourceLayerSpecification | undefined;
      if (!layer) return;

      const currentMin = layer.minzoom ?? 0;
      const currentMax = layer.maxzoom ?? 24;

      const newMin = minzoom ?? currentMin;
      const newMax = maxzoom ?? currentMax;

      map.setLayerZoomRange(id, newMin, newMax);
    }
  }

  private removeLayer(): void {
    const mapId = this.mapId();
    if (!this.mapService.isReady(mapId)) return;

    const map = this.mapService.getMap(mapId);
    const id = this.id();

    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
  }

  ngOnDestroy(): void {
    this.removeLayer();
  }
}
