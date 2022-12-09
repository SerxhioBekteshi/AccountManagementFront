import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import React from "react";
import "./index.scss";

export interface IDrawerProps {
  title?: ReactNode;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
const Drawer = (props: IDrawerProps) => {
  const { title, show, children, actions, onClose } = props;

  return (
    <div>
    {show && (
      <div
        className={`drawerContent shadow-lg p-2 d-flex flex-column justify-content-between`}
      >
        <Col className="drawerBody">
          <div className="p-3 drawerTitle border-bottom">
            {title}
            <FontAwesomeIcon
              className="close-icon"
              onClick={onClose}
              icon={"fa-solid fa-x" as any}
            />
          </div>
          <div className="p-3">{children}</div>
        </Col>
        <div className="d-flex actions flex-row justify-content-end gap-2 ">
          {actions}
        </div>
      </div>
    )}
    </div>
  );
};

export default Drawer;
