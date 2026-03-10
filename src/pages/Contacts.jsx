import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";
import ContactCard from "../pages/ContactCard"; 

const Contacts = () => {
  const { contacts, loadContacts } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1>Agenda</h1>
        <button onClick={() => navigate("/add")} className="btn-add">
           Agregar Contacto
        </button>
      </div>

      <div className="contacts-list">
        {contacts.length === 0 ? (
          <p className="empty-msg">No hay contactos aún. ¡Agrega el primero!</p>
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;