import { Inter } from '@next/font/google'
import { VStack } from '@chakra-ui/react';
import { NavBar } from '../src/sub_pages/navbar';
import { UserCondition } from '../src/sub_pages/userCondition';
import { PopUp } from '../src/components/popUp';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <PopUp />
     {/* Desktop */}
     <VStack w='full'>
        <NavBar />
        <UserCondition />
     </VStack>
    </>
  )
}
