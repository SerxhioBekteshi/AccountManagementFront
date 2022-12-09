import axios from "axios";
import { FC, useState } from "react";
import Table from "../../../../main/components/table/index";
import eFormMode from "../../../../main/assets/enums/eFormMode";
import DetailDrawer from "../../../../main/components/DetailDrawer";
import CompanyForm from "./CompanyForm";
import DeleteModal from "../../../../main/components/ModalDetailDelete";
import { useNavigate, useParams } from "react-router-dom";
import EventManager from "../../../../main/utils/eventManager";

const CompaniesPage: FC = () => {
  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const navigate = useNavigate();

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`Companies/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;

      case eFormMode.Insert:
        navigate(`/admin/companies/addCompanyManager/${rowId}`);
        break;
    }
  };

  const handleCompanyAdd = () => {
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
        handleAddRow={handleCompanyAdd}
        controller="Companies"
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          modeDrawer={modeDrawer}
          onSave={() => {
            handleClose();
            EventManager.raiseRefreshTable("Companies");
          }}
          formData={formData}
          controller="Companies"
        >
          <CompanyForm />
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller="Companies"
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CompaniesPage;
