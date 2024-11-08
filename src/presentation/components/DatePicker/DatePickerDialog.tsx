import React, { useEffect, useId, useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import { Modal, Button, Form } from "react-bootstrap";
import { es } from "react-day-picker/locale";
import "react-day-picker/dist/style.css";

interface DatePickerDialogProps {
  selectedDate: string | undefined; // Ahora es un string en formato "YYYY-MM-DD"
  onDateChange: (date: string) => void;
}

export default function DatePickerDialog({
  selectedDate,
  onDateChange,
}: DatePickerDialogProps) {
  const headerId = useId();

  // Controla el mes actual del calendario
  const [month, setMonth] = useState(new Date());

  // Valor del input de fecha, inicializado con el valor formateado de `selectedDate`
  const [inputValue, setInputValue] = useState(
    selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""
  );

  // Controla la visibilidad del modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Alterna la visibilidad del modal
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  // Sincroniza `selectedDate` externamente con el valor del input y el mes del calendario
  useEffect(() => {
    if (selectedDate) {
      const parsedDate = dayjs(selectedDate).toDate(); // Convierte a `Date`
      setInputValue(dayjs(parsedDate).format("DD/MM/YYYY"));
      setMonth(parsedDate);
    } else {
      setInputValue("");
    }
  }, [selectedDate]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    setIsDialogOpen(false);
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Convierte `Date` a `string`
      setInputValue(dayjs(date).format("DD/MM/YYYY"));
      onDateChange(formattedDate); // Llama al callback con el string formateado
    } else {
      setInputValue("");
      onDateChange("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = dayjs(e.target.value, "DD/MM/YYYY").toDate();

    if (dayjs(parsedDate).isValid()) {
      const formattedDate = dayjs(parsedDate).format("YYYY-MM-DD");
      onDateChange(formattedDate); // Pasa el `string` en formato "YYYY-MM-DD"
      setMonth(parsedDate);
    } else {
      onDateChange("");
    }
  };

  return (
    <div>
      <Form.Group controlId="date-input">
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            value={inputValue}
            placeholder={"DD/MM/YYYY"}
            onChange={handleInputChange}
            style={{ maxWidth: "200px", marginRight: "8px" }}
          />
          <Button
            variant="outline-primary"
            onClick={toggleDialog}
            aria-label="Abrir calendario para elegir la fecha"
          >
            📆
          </Button>
        </div>
      </Form.Group>

      <Modal show={isDialogOpen} onHide={toggleDialog} centered>
        <Modal.Header closeButton>
          <Modal.Title id={headerId}>Selecciona una Fecha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DayPicker
            locale={es}
            month={month}
            onMonthChange={setMonth}
            mode="single"
            selected={selectedDate ? dayjs(selectedDate).toDate() : undefined}
            onSelect={handleDayPickerSelect}
            captionLayout="dropdown"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDialog}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
