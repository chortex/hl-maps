import { LayerSpecification, FilterSpecification } from 'maplibre-gl';

export type HlSourceLayerSpecification = Extract<LayerSpecification, { source: string }>;

export type HlLayerId = string;
export type HlLayerType = HlSourceLayerSpecification['type'];
export type HlLayerLayout = HlSourceLayerSpecification['layout'];
export type HlLayerPaint = HlSourceLayerSpecification['paint'];
export type HlLayerFilter = FilterSpecification;
