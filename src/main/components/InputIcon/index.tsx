import "./style.scss";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eColorOptions from "../../assets/enums/colors/eColorOptions";

export interface IInputIcon {
  error?: any;
  type: string;
  name?: string;
  id?: string;
  border?: boolean;
  value?: string;
  size?: "lg" | "md" | "sm";
  iconName: string;
  placeholder?: string;
  color?: eColorOptions;
  onInputChange?: (value: any) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onIconClick?: () => void;
  onClick?: (value: any) => void;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
  onKeyUp?: (value: any) => void;
}
const InputIcon = (props: IInputIcon) => {
  const {
    error,
    onFocus,
    onKeyUp,
    type,
    name,
    id,
    value,
    placeholder,
    iconName,
    onBlur,
    size,
    color,
    border,
    onClick,
    onChange,
    onInputChange,
    onIconClick,
  } = props;


  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };
  const handleChange = (e: any) => 
  {
    if (onChange) {
      onChange(e);
    }
    if (onInputChange) {
      onInputChange(e.target.value);
    }
  };
  
  return (
    <InputGroup
      className={`border-${color} ${
        error !== undefined && "is-invalid"
      } form-control ${border === false && "unset-border"}`}
      size={size}
    >
      <Input
        type={`${type}` as any}
        name={name}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        id={id}
        onFocus={onFocus}
        onClick={onClick}
        value={value}
        onBlur={onBlur}
        className={`costumize-input-icon`}
        onChange={handleChange}
      />
      <InputGroupText
        style={{ background: "unset", border: "unset", padding: "0 5px" }}
        className="input-icon"
        onClick={() => handleIconClick()}
      >
        <FontAwesomeIcon icon={iconName as any} className={`text-${color}`} />
      </InputGroupText>
    </InputGroup>
  );
};
export default InputIcon;
