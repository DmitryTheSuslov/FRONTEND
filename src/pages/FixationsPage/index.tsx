import React, { useEffect, useState } from "react";
import { Container, Table, Row, Col } from "reactstrap";
import { api } from "src/api"; 
import FixCard from "components/FixCard";
import { parseISO, format } from "date-fns"; 
import "./index.css";


function formatDate(dateString) {
  if (!dateString) {
      return '-'; // Возвращаем прочерк для нулевой или пустой строки
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}



interface Event {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  addresses: Array<any>; 
  paydate: string;
  fixation_id: number
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.fixations.fixationsSearchList();

      if (response.status === 200) {
        setEvents(response.data);
      } else {
        setError("Ошибка при загрузке адресов");
      }
    } catch (err) {
      console.error("Ошибка при загрузке адресов:", err);
      setError("Ошибка при загрузке адресов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  console.log(events)
  return (
    <Container>
      <h1 className="events-title">Фиксации</h1>

      {loading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}

      {!loading && events.length > 0 && (
        <Row>
        {events.map((item, index) => (
          <Col key={item.id} xs="12" className="mb-3">
            <FixCard
              id={index + 1}
              created_at={formatDate(item.created_at)}
              submitted_at={formatDate(item.submitted_at)}
              completed_at={formatDate(item.completed_at)}
              pay_date={formatDate(item.paydate)}
              addresses_count={item.addresses.length}
              status={item.status}
              true_id={item.fixation_id}
            />
          </Col>
        ))}
      </Row>
      )}

      {!loading && events.length === 0 && <p>Мероприятий не найдено.</p>}
    </Container>
  );

};

export default EventsPage;