export const Hline = ({
  color = 'black',
  height = 12,
  width = '100px'
}: {
  color?: string
  height?: number
  width?: string
}) => {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        border: 'none'
      }}
    />
  )
}
