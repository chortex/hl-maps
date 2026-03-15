import { MapOptions, StyleSpecification } from 'maplibre-gl';

export type MapStyle = string | StyleSpecification;

export interface MapInitOptions extends Omit<MapOptions, 'container' | 'style'> {
  style: MapStyle;
}

export type MapEventData = Record<string, unknown>;
