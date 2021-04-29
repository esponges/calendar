import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const DayCellModal = ({
  modalIsOpen,
  afterOpenModal,
  closeModal,
  dayCellData,
  monthNames,
  saveAppointment,
}) => {
  const [inputDetails, setInputDetails] = useState(null);
  const [inputDay, setInputDay] = useState(null);
  const [inputMonth, setInputMonth] = useState(null);
  const { day, month, year } = dayCellData;

  const getInfo = (setData, e) => {
      console.log('input month ', inputMonth, 'input day is ', inputDay, 'day is', day, 'month is', month);
    // console.log("getInfo called and closed is ", setData);
    // console.log('inputDetails ', inputDetails, 'inputDay ', inputDay, 'month ', inputMonth, 'day ', day, 'month ', month);
    let data;
    if (setData) {
        // console.log('setDAta!!!');
      data = {
        details: inputDetails ?? "",
        day: inputDay ?? day,
        month: inputMonth ?? month,
        year: year,
      };
      saveAppointment(data);
    } else {
        // console.log('unsetData!!');
        data = {
          details: "",
          day: day,
          month: month,
          year: year,
        };
    }
    setInputDay(null);
    setInputMonth(null);
    closeModal();
    console.log(data);
  };

  const auxCloseModal = (e) => {
    getInfo(false);
    setInputDetails(null);
    setInputMonth(null);
    closeModal();
  };

  useEffect(() => {
  }, [inputMonth, inputDay, inputDetails]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={auxCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {console.log("render")}
      {day ? (
        <div>
          <Button onClick={auxCloseModal} size="xs" id="modal-close-btn">
            x
          </Button>
          <h2>New appointment</h2>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter details"
                onChange={(e) => setInputDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="31"
                placeholder="description"
                defaultValue={day}
                onChange={(e) => setInputDay(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Month</Form.Label>
              <Form.Control
                as="select"
                onChange={
                  ((e) => setInputMonth(e.target.value),
                  (e) => console.log(e.target.value))
                }
                defaultValue={month}
              >
                {monthNames.map((item) => {
                  return <option key={item.index}>{item.month}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>{year}</Form.Label>
            </Form.Group>
            <Button onClick={(e) => getInfo(true, e)}>Create</Button>
          </Form>
        </div>
      ) : (
        <div>
          <Button onClick={auxCloseModal} size="xs" id="modal-close-btn">
            x
          </Button>
          <h4>Please choose a day from the actual month</h4>
        </div>
      )}
    </Modal>
  );
};

export default DayCellModal;
