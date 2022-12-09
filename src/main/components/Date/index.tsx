import React, { useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Input, InputGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";
import "./style.scss";

const Date = (props: any) =>
{
    const {value, id, onChange, error, name} = props;

    const [open, setOpen] = useState<boolean>(false);
    const datePickerRef = useRef(null);
     
    const toggleOpen = () =>
    {
        setOpen(!open);
    }
    return(
        <div> 
      <InputGroup
        className={`form-control justify-content-between flex-nowrap ${
          error ? "border border-danger" : ""
        } `}
      >
        <DatePicker 
            open={open}
            ref = {datePickerRef}
            id = {id}
            onChange={(date: any) => { 
                const dateString = moment(date). format('YYYY-MM-DD')
                onChange(dateString);
            }} 
            onSelect = {() => setOpen(false)}
            dateFormat='YYYY-MM-DD'	
            value={value} 
            name = {name} 
            customInput = {
                <>
                <InputGroup>
                <Input onClick = {() => toggleOpen()} 
                // className = {`form-control justify-content-between flex-nowrap ${error ? "border border-danger" : "" }  `} 
                    {...props}>
                </Input>
                <FontAwesomeIcon
                    className="px-1 my-auto i-icon cursor-pointer"
                    icon={"fa-regular fa-calendar" as any}
                    size="lg"
                    onClick={() => {
                        let last = datePickerRef?.current?.props.open;
                        if (!last) {
                            setOpen(true);
                        } else {
                        setOpen(false);
                        }
                    }}
                />
                </InputGroup>
            </>
            }
        />
    </InputGroup>
    </div>
    )
}


export default Date;