import type { ComponentProps, CSSProperties } from 'react'

import { Container } from '../Container/Container'

type Props = ComponentProps<typeof Container> & {
  direction?: CSSProperties['flexDirection']
  justifyItems?: CSSProperties['justifyItems']
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  alignContent?: CSSProperties['alignContent']
  gap?: CSSProperties['gap']
}

export const Flex = ({
  children,
  direction: flexDirection,
  justifyItems,
  justifyContent,
  alignItems,
  alignContent,
  gap,
  style,
  ...rest
}: Props) => (
  <Container
    {...rest}
    style={{
      ...style,
      display: 'flex',
      flexDirection,
      justifyItems,
      justifyContent,
      alignItems,
      alignContent,
      gap
    }}
  >
    {children}
  </Container>
)
