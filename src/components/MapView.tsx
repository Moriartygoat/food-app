import React, { useEffect, useMemo, useRef } from 'react';
import { View, Platform, StyleSheet } from 'react-native';

type Props = {
  lat: number;
  lng: number;
  focusKey?: number; // увеличивай, чтобы карта перелетела к точке (IP/GPS)
  onPick?: (lat: number, lng: number) => void;
  height?: number;
  interactive?: boolean; // false = только показать точку (корзина)
};

const buildHtml = (lat: number, lng: number, interactive: boolean) => `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>html,body,#m{height:100%;margin:0;background:#EEF1F4}</style></head><body><div id="m"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var interactive=${interactive};
var map=L.map('m',{
  attributionControl:false,
  zoomControl:interactive,dragging:interactive,touchZoom:interactive,
  scrollWheelZoom:interactive,doubleClickZoom:interactive,boxZoom:interactive,keyboard:interactive
}).setView([${lat},${lng}],${interactive ? 15 : 16});
L.control.attribution({prefix:false}).addTo(map);

var esri=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{
  maxZoom:19,attribution:'Tiles © Esri'}).addTo(map);
var failed=0;
esri.on('tileerror',function(){
  failed++;
  if(failed===4){
    map.removeLayer(esri);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
  }
});

var marker=L.marker([${lat},${lng}]).addTo(map);
function send(a,b){var s=JSON.stringify({lat:a,lng:b});
  if(window.ReactNativeWebView){window.ReactNativeWebView.postMessage(s);}else{parent.postMessage(s,'*');}}
if(interactive){map.on('click',function(e){marker.setLatLng(e.latlng);send(e.latlng.lat,e.latlng.lng);});}
function setPin(a,b){marker.setLatLng([a,b]);map.setView([a,b],16);}
window.addEventListener('message',function(e){try{var d=JSON.parse(e.data);if(d.set){setPin(d.lat,d.lng);}}catch(x){}});
</script></body></html>`;

export default function MapView({ lat, lng, focusKey = 0, onPick, height = 240, interactive = true }: Props) {
  const html = useMemo(() => buildHtml(lat, lng, interactive), []); // только начальная точка
  const webRef = useRef<any>(null);
  const frameRef = useRef<any>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (Platform.OS === 'web') {
      frameRef.current?.contentWindow?.postMessage(JSON.stringify({ set: 1, lat, lng }), '*');
    } else {
      webRef.current?.injectJavaScript(`setPin(${lat},${lng});true;`);
    }
  }, [focusKey]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !onPick) return;
    const h = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      try {
        const d = JSON.parse(e.data);
        if (typeof d.lat === 'number') onPick(d.lat, d.lng);
      } catch {}
    };
    window.addEventListener('message', h);
    return () => window.removeEventListener('message', h);
  }, [onPick]);

  if (Platform.OS === 'web') {
    return (
      <View style={[s.map, { height }]} pointerEvents={interactive ? 'auto' : 'none'}>
        {React.createElement('iframe', {
          ref: frameRef,
          srcDoc: html,
          style: { border: 0, width: '100%', height: '100%' },
        })}
      </View>
    );
  }

  const { WebView } = require('react-native-webview');
  return (
    <View style={[s.map, { height }]} pointerEvents={interactive ? 'auto' : 'none'}>
      <WebView
        ref={webRef}
        style={{ flex: 1, backgroundColor: '#EEF1F4' }}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        nestedScrollEnabled
        onMessage={(e: any) => {
          try {
            const d = JSON.parse(e.nativeEvent.data);
            onPick?.(d.lat, d.lng);
          } catch {}
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  map: { backgroundColor: '#EEF1F4', borderRadius: 16, overflow: 'hidden' },
});