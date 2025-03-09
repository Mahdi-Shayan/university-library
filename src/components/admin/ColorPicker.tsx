import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value: string;
  onPickerChange: (color: string) => void;
}

function ColorPicker({ onPickerChange, value }: Props) {
  return (
    <div className="relative">
      <div className="flex mb-5 book-form_input rounded-md py-0">
        <p className="mr-[2px]" style={{ alignContent: "center" }}>#</p>
        <HexColorInput
          className="hex-input"
          color={value}
          onChange={onPickerChange}
          placeholder="Enter Color"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
}

export default ColorPicker;
