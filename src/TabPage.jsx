import React, { useState, useEffect } from "react";
import { Tab, Tabs, Button, Modal, Table } from "react-bootstrap";
import { useUnsavedChanges } from "./UnsavedChangesContext";

const TabPage = ({ title }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [data, setData] = useState({ tab1: [], tab2: [] });
  const {
    unsavedChanges,
    setUnsavedChanges,
    showModal,
    setShowModal,
    pendingAction,
    setPendingAction,
  } = useUnsavedChanges();

  const handleTabSelect = (tab) => {
    if (unsavedChanges) {
      setPendingAction(() => () => setActiveTab(tab));
      setShowModal(true); // Show confirmation modal if there are unsaved changes
    } else {
      setActiveTab(tab); // Directly switch tabs if no unsaved changes
    }
  };

  const handleAddData = (tabName) => {
    setData((prevData) => ({
      ...prevData,
      [tabName]: [...prevData[tabName], `Item ${prevData[tabName].length + 1}`],
    }));
    setUnsavedChanges(true); // Mark data as unsaved
  };

  const handleSaveData = () => {
    console.log("Data saved:", data);
    setUnsavedChanges(false); // Reset unsaved changes flag
  };

  const handleConfirmNavigation = () => {
    if (pendingAction) {
      pendingAction(); // Execute the stored navigation or tab action
    }
    setShowModal(false);
    setPendingAction(null);
  };

  const handleCancelNavigation = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <div className="tab-page-container">
      <h2>{title}</h2>

      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
        <Tab eventKey="tab1" title="Tab 1">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.tab1.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => handleAddData("tab1")}>Add Data</Button>
          <Button variant="success" className="ml-2" onClick={handleSaveData}>
            Save Data
          </Button>
        </Tab>

        <Tab eventKey="tab2" title="Tab 2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.tab2.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={() => handleAddData("tab2")}>Add Data</Button>
          <Button variant="success" className="ml-2" onClick={handleSaveData}>
            Save Data
          </Button>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleCancelNavigation}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved changes. Are you sure you want to leave?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelNavigation}>
            Stay on Page
          </Button>
          <Button variant="primary" onClick={handleConfirmNavigation}>
            Leave Anyway
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TabPage;
