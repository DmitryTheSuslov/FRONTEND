import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "src/api"; 
import { parseISO, format } from "date-fns"; 
import "./index.css";

interface Event {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  addresses: Array<any>; 
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

  return (
    <Container>
      <h1 className="events-title">Фиксации</h1>

      {loading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}

      {!loading && events.length > 0 && (
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата формирования</th>
              <th>Дата завершения</th>
              <th>Количество адресов</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.status}</td>
                <td>
                  {event.created_at
                    ? format(parseISO(event.created_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>
                  {event.submitted_at
                    ? format(parseISO(event.submitted_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>
                  {event.completed_at
                    ? format(parseISO(event.completed_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>{event.addresses.length}</td> {/* Используем длину массива classrooms */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && events.length === 0 && <p>Мероприятий не найдено.</p>}
    </Container>
  );
};

export default EventsPage;