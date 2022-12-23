import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { UpgradeToPro } from "./upgradeToPro.jsx";
import { useProvider } from "../context";

export const PopUp = () => {
    // Attributes
    const { isOpenPopUp, onClosePopUp, cancelRef_PopUp } = useProvider();
    // Methods
    // Component
    return (
        <AlertDialog
        isOpen={isOpenPopUp}
        onClose={onClosePopUp}
        leastDestructiveRef={cancelRef_PopUp}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              UPGRADE TO PRO
            </AlertDialogHeader>
            <AlertDialogBody>
              <UpgradeToPro />
            </AlertDialogBody>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
};