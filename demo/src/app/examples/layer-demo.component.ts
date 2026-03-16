import { Component } from '@angular/core';
import { HlLayerComponent } from 'ui/src/lib/components/layer/layer.component';
import { HlMapComponent } from 'ui/src/lib/components/map/map.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '@chortex/ui-kit-lib';

@Component({
  selector: 'app-layers-demo',
  standalone: true,
  imports: [CommonModule, HlMapComponent, HlLayerComponent, UiModule],
  template: `
    <div class="map-wrapper">
      <hl-map [style]="style" [center]="center" [zoom]="5"></hl-map>

      <hl-layer
        id="blue-line"
        sourceId="maplibre"
        type="fill"
        sourceLayer="countries"
        [paint]="bluePaint"
      ></hl-layer>

      <hl-layer
        id="red-fill"
        sourceId="maplibre"
        type="fill"
        sourceLayer="countries"
        [paint]="redPaint"
      ></hl-layer>

      <ui-button class="layer-control" (onClick)="toggleRed()">{{
        (showRed ? 'Hide' : 'Show') + ' red overlay'
      }}</ui-button>
    </div>
  `,
  styles: [
    `
      .map-wrapper {
        position: absolute;
        inset: 0;
      }
      .layer-control {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      hl-map {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class LayerDemoComponent {
  style = 'https://demotiles.maplibre.org/style.json';
  center: [number, number] = [30.52, 50.45];

  showRed = false;

  get redPaint() {
    return {
      'fill-color': '#ff0000',
      'fill-opacity': this.showRed ? 0.2 : 0,
    };
  }

  get bluePaint() {
    return {
      'fill-color': 'transparent',
      'fill-outline-color': this.showRed ? '#0000ff' : '#ffffff',
    };
  }

  toggleRed() {
    this.showRed = !this.showRed;
  }
}
