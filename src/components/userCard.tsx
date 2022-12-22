import React from "react";
import {
  HStack,
  Box,
  Image,
  Text,
  VStack,
  Button,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { UpgradeToPro } from "./upgradeToPro";

export const UserCard = () => {
  // Attributes
  const [wallet, setWallet] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const cancelRef = React.useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Methods
  const handleUpgrade = () => {};
  // Component
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              UPGRADE TO PRO
            </AlertDialogHeader>
            <AlertDialogBody>
              <UpgradeToPro />
            </AlertDialogBody>
            <AlertDialogFooter>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {wallet == null ? (
        loading == false ? (
          <HStack>
            <Button bg="gray.600">
              <HStack>
                <Box w="10px" h="10px" />
                <Image
                  src="https://i.ibb.co/jgR5nn6/wallet.png"
                  alt="user"
                  boxSize="30px"
                />
                <Box w="10px" />
                <Text>Connect Wallet</Text>
                <Box w="10px" />
              </HStack>
            </Button>
            <Box w="10px" />
          </HStack>
        ) : (
          <Spinner />
        )
      ) : (
        <HStack>
          <VStack>
            <HStack bg="gray.600" borderRadius={6} h="40px">
              <Box w="10px" h="10px" />
              <Image
                src="https://i.ibb.co/mBDyGt0/user.png"
                alt="user"
                boxSize="30px"
              />
              <Box
                display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
                w="10px"
              />
              <Text
                display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
              >
                Free Version
              </Text>
              <Button bg="gray.600" onClick={onOpen}>
                <Image
                  src="https://i.ibb.co/bLVdtB9/upgrade-yellow.png"
                  alt="upgrade"
                  boxSize="30px"
                />
              </Button>
            </HStack>
          </VStack>
          <Box w="10px" />
        </HStack>
      )}
    </>
  );
};
