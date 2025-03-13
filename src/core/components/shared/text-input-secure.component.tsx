import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const TextInputSecureComponent = (props: TextInputSecureProps) => {
    
  const [hidePassword, setHidePassword] = useState(true);
  const defaultProps = new TextInputSecureProps();
  const visableIconToUse = props.visiableIcon ?? defaultProps.visiableIcon;
  const invisiableIconToUse = props.invisibleIcon ?? defaultProps.invisibleIcon;
  const labelToUse = props.label ?? defaultProps.label;

  return (
    <TextInput
      value={props.value}
      secureTextEntry={hidePassword}
      right={
        <TextInput.Icon
          icon={hidePassword ? invisiableIconToUse! : visableIconToUse!}
          onPress={() => setHidePassword(!hidePassword)}
        />
      }
      label={labelToUse}
      onChangeText={props.onChangeText}
    ></TextInput>
  );
};

export class TextInputSecureProps {
  value: string = "";
  label?: string = "Password";
  visiableIcon?: string = "eye";
  invisibleIcon? : string = "eye-off";
  onChangeText: (text: string) => void = () => {};
}

export default TextInputSecureComponent;
