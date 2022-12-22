import axios from "axios";
import React, { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import { useNavigate, useParams } from "react-router-dom";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import BankForm from "./BankForm";
import EventManager from "../../../../main/utils/eventManager";

const BanksPage: FC = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`Bank/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleAddBank = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData(null);
    setDeleteRowId(0);
  };

  const handleCloseModal = () => {
    setDeleteRowId(0);
  };

  return (
    <div>
      <Table
        onIconClick={onIconClick}
        handleAddRow={handleAddBank}
        controller="Bank"
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("Bank");
          }}
          modeDrawer={modeDrawer}
          formData={formData}
          controller="Bank"
        >
          <BankForm />
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller="Bank"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BanksPage;
