import { FaCircleNotch } from 'react-icons/fa'

import { Flex } from '../Flex/Flex'

export const Loader = () => (
  <Flex justifyContent='center' alignItems='center' style={{ height: '100%', minHeight: '150px' }}>
    <FaCircleNotch style={{ animation: 'spin 1s linear infinite' }} size={24} color='#999' />
  </Flex>
)
