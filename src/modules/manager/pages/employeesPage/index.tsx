import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import Table from "../../../../main/components/table";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import EmployeesForm from "./EmployeesForm";

const Employees = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`Employess/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleEmployeeAdd = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData([]);
    setDeleteRowId(0);
  };

  const handleCloseModal = () => {
    setDeleteRowId(0);
  };

  return (
    <div>
      <Table
        onIconClick={onIconClick}
        handleAddRow={handleEmployeeAdd}
        controller="Employess"
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="Employess"
        >
          <EmployeesForm />
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller="Employess"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Employees;
