import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

const ContactCard = ({ contact }) => {
  const { deleteContact } = useAppContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <div className="contact-card">
      <div className="contact-avatar">
        {contact.name?.charAt(0).toUpperCase()}
      </div>

      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-detail">📞 {contact.phone}</p>
        <p className="contact-detail">✉️ {contact.email}</p>
        <p className="contact-detail">📍 {contact.address}</p>
      </div>

      <div className="contact-actions">
        <button
          className="btn-edit"
          onClick={() => navigate(`/edit/${contact.id}`)}
        >
           Editar
        </button>
        <button
          className="btn-delete"
          onClick={handleDelete}
        >
           Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContactCard;