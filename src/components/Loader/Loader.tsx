import { FaCircleNotch } from 'react-icons/fa'

import { Flex } from '../Flex/Flex'

type Props = {
  progress?: number
}

export const Loader = ({ progress }: Props) => (
  <Flex
    justifyContent='center'
    direction='column'
    alignItems='center'
    style={{ height: '100%', minHeight: '150px' }}
  >
    <FaCircleNotch style={{ animation: 'spin 1s linear infinite' }} size={24} color='#999' />
    {progress ? <span>{progress}%</span> : null}
  </Flex>
)
