import { Component } from '@angular/core';
import { HlMapComponent } from 'ui/src/lib/components/map/map.component';

@Component({
  selector: 'app-map-demo',
  template: `
    <div class="map-wrapper">
      <hl-map
        [style]="style"
        [center]="center"
        [zoom]="zoom"
        (mapLoad)="onMapLoad($event)"
      ></hl-map>
    </div>
  `,
  styles: [
    `
      .map-wrapper {
        position: absolute;
        inset: 0;
      }
      hl-map {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [HlMapComponent],
})
export class MapDemoComponent {
  style = 'https://demotiles.maplibre.org/style.json';
  center: [number, number] = [30.5234, 50.4501];
  zoom = 6;

  onMapLoad(map: maplibregl.Map) {
    console.log('Map loaded', map);
  }
}
