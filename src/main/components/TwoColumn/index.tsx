import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { ToggleInnerRightPart } from "../../store/stores/customizer/customizer.store";
import { RootState } from "../../store/redux/rootState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface IThreeColumn {
  leftContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}
const TwoColumn = (props: IThreeColumn) => {
  const { leftContent, middleContent, rightContent } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };
  const isRightOpen = useSelector(
    (state: RootState) => state.customizer.isInnerRightPart
  );

  return (
    <div className="d-md-flex d-sm-block position-relative leftRightBox threeColumn gap-2">
      {leftContent && (
        <div className={`leftPart bg-white ${isOpen ? "showLeftPart" : ""}`}>
          <Button className="d-xl-none openCloseBtn" color="danger">
            <i
              className={`bi ${isOpen ? "bi-x" : "bi-list"}`}
              onClick={handleSubmit}
            />
          </Button>
          {/* <SimpleBar style={{ height: "calc(100vh - 200px)" }}> */}
          {leftContent}
          {/* </SimpleBar> */}
        </div>
      )}
      <div className="middlePart flex-shrink-0">
        {/* <SimpleBar style={{ height: "calc(100vh - 200px)" }}> */}
        {middleContent}
        {/* </SimpleBar> */}
      </div>
      <div className={`rightPart ${isRightOpen ? "showRightPart" : ""}`}>
        {/* <Button
          onClick={() => dispatch(ToggleInnerRightPart())}
          className="bg-transparent text-primary border-0 p-0 position-absolute closeRbtn d-md-none"
        > */}
        {/* <FontAwesomeIcon icon={"fa-solid fa-x" as any} />
         */}
        {/* <Iconly
            name="ChevronLeftCircle"
            set="bold"
            style={{ width: "41px", height: "41px" }}
          /> */}
        {/* </Button> */}
        <Button
          className="text-primary bg-primary rounded-circle border-0 closeRbtn d-md-none position-absolute"
          style={{ width: "41px", height: "41px" }}
          onClick={() => dispatch(ToggleInnerRightPart())}
        >
          <FontAwesomeIcon
            color="white"
            icon={"fa-solid fa-angle-left" as any}
            size="lg"
          />
        </Button>
        {/* <SimpleBar style={{ height: "calc(100vh - 200px)", width: "100%" }}> */}
        {rightContent}
        {/* </SimpleBar> */}
        {isOpen ? <div className="contentOverlay" /> : ""}
      </div>
    </div>
  );
};

export default TwoColumn;
