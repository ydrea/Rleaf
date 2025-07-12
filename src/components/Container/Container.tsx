import type { CSSProperties } from 'react'

type Props = {
  id?: string
  children?: React.ReactNode
  m?: CSSProperties['margin']
  mt?: CSSProperties['marginTop']
  mb?: CSSProperties['marginBottom']
  ml?: CSSProperties['marginLeft']
  mr?: CSSProperties['marginRight']
  p?: CSSProperties['padding']
  pt?: CSSProperties['paddingTop']
  pb?: CSSProperties['paddingBottom']
  pl?: CSSProperties['paddingLeft']
  pr?: CSSProperties['paddingRight']
  w?: CSSProperties['width']
  h?: CSSProperties['height']
  bg?: CSSProperties['backgroundColor']
  flex?: CSSProperties['flex']
  style?: CSSProperties
  className?: string
}

export const Container = ({
  id,
  children,
  m,
  mt,
  mb,
  ml,
  mr,
  p,
  pt,
  pb,
  pl,
  pr,
  w,
  h,
  bg,
  flex,
  style,
  className
}: Props) => (
  <div
    id={id}
    className={className}
    style={{
      margin: m,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
      padding: p,
      paddingTop: pt,
      paddingBottom: pb,
      paddingLeft: pl,
      paddingRight: pr,
      width: w,
      height: h,
      backgroundColor: bg,
      flex,
      ...style
    }}
  >
    {children}
  </div>
)
