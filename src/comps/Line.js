// import './styles.css';
export default function Hline({
  color = 'black',
  height = 12,
  width = '100px',
}) {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        border: 'none',
      }}
    />
  );
}
