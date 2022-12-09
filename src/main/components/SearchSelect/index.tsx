import { Dropdown, DropdownItem, DropdownMenu, Input } from "reactstrap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import PropertyManager from "../../utils/propertyManager";
import ISelectOption from "../../interfaces/controllers/ISelectOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tag from "../Tag";
import "./style.scss";

interface ISearchSelectProps {
  value: number;
  error?: any;
  id?: string;
  onChange: (value: any) => void;
  controller?: any;
  maxSuggestions?: number;
}

const SearchSelect = (props: ISearchSelectProps) => {
  const { value: propValue, id, onChange, controller, maxSuggestions } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(propValue);
  const [label, setLabel] = useState<string>("");
  const [options, setOptions] = useState<ISelectOption[]>([]);

  const topRecords = PropertyManager.getValueOrDefault(maxSuggestions, 5);

  const selectRef = useRef(null);
  const arrowRef = useRef(null);

  const [height, setHeight] = useState<any>(null);

  useLayoutEffect(() => {
    if (open) {
      const elem = document.getElementById("dropdown");
      const rect = elem.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [open, height]);

  const initialResolve = async () => {
    const res: any = await (
      await axios.post(`${controller}`, {
        searchTerm: "",
        top: topRecords,
      })
    ).data;

    if (res.result) {
      setOptions(res.data);
    }
  };

  const handleArrowClick = () => {
    const newState = !open;
    setOpen(newState);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value.length > 2) {
      const response = await (
        await axios.post(`${controller}`, {
          searchTerm: e.target.value,
          top: topRecords,
        })
      ).data;
      setOpen(true);
      setOptions(response.data);
    } else {
      initialResolve();
    }
  };
  const debouncedChangeHandler = useCallback(debounce(handleSearch, 500), []);

  const handleOptionSelect = (option: ISelectOption) => {
    setValue(option.value);
    setLabel(option.label);
    onChange(option.value);
  };

  const handleBodyClick = (e: MouseEvent) => {
    if (selectRef?.current?.contains(e.target)) {
      if (arrowRef?.current.contains(e.target)) {
        return;
      }
      // setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleBodyClick);
    initialResolve();
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleIconClick = () => {
    setValue(null);
    // setOpen(false);
    initialResolve();
  };

  return (
    <div ref={selectRef} style={{ marginLeft: `${open ? height + "px" : ""}` }}>
      <div className="rounded border search-select-container">
        <div className="d-flex badge-container">
          {value && (
            <Tag key={value} text={label} onIconClick={handleIconClick} />
          )}
          <Input
            type="text"
            id={id}
            iconName="fa-solid fa-angle-down"
            placeholder="Search..."
            style={{ flexGrow: "1", width: "unset", border: "unset" }}
            onChange={debouncedChangeHandler}
          />
        </div>
        <div
          className="text-center"
          ref={arrowRef}
          onClick={() => handleArrowClick()}
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            size={"lg"}
            icon={`fa-solid fa-angle-${open ? "up" : "down"}` as any}
          />
        </div>
      </div>
      <Dropdown className="d-flex w-100" isOpen={open}>
        <DropdownMenu id="dropdown" className="w-100 border mt-2">
          {options.length > 0 ? (
            <>
              {options.map((option: any) => {
                return (
                  <DropdownItem
                    key={option.label}
                    value={option.value}
                    className="d-flex gap-2"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </DropdownItem>
                );
              })}
            </>
          ) : (
            <h5 className="text-center m-0">No options available</h5>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default SearchSelect;
