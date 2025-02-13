import React from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import RealTimeBlur from "../react-native-realtimeblur";
import { View, StyleSheet, Pressable } from "react-native";

export interface ITransactionDetailsProps {
  children: any;
  useModalComponent?: boolean;
  goBackByClickingOutside?: boolean;
  nomargin?: boolean
}
export default function BlurModal({ children, useModalComponent, goBackByClickingOutside, noMargin }: ITransactionDetailsProps) {
  const navigation = useNavigation();
  const useModal = useModalComponent ?? true;
  goBackByClickingOutside = goBackByClickingOutside ?? true;
  noMargin = noMargin ?? false;

  const goBack = () => {
    if (goBackByClickingOutside) {
      navigation.goBack();
    }
  };

  return (
    <RealTimeBlur
      overlayColor="#00000000"
      downsampleFactor={1.2}
      blurRadius={15}
    >
      {!useModal
        ? <View style={{ flex: 1 }}>
            <Pressable style={{ width: "100%", height: "100%" }} onPress={goBack}></Pressable>
            <View style={style.container}>
              <View style={[style.inner, { margin: noMargin ? 0 : style.inner.margin }]}>
                {children}
              </View>
            </View>
          </View>
        : <Modal
            onBackdropPress={goBack}
            onRequestClose={goBack}
            visible={true}
          >
            {children}
          </Modal>
      }
    </RealTimeBlur>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    margin: 12,
    padding: 0,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});
