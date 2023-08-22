export default function CustomCtrl({ layers, onLayerToggle }) {
  return (
    <div>
      {layers.map(layer => (
        <label key={layer.name}>
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => onLayerToggle(layer.name)}
          />
          {layer.name}
        </label>
      ))}
    </div>
  );
}
