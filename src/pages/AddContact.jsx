import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

const AddContact = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { contacts, addContact, updateContact } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find((c) => c.id === parseInt(id));
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name,
          phone: contactToEdit.phone,
          email: contactToEdit.email,
          address: contactToEdit.address,
        });
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateContact(parseInt(id), formData);
    } else {
      await addContact(formData);
    }

    navigate("/"); 
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>{id ? "Editar Contacto" : "Nuevo Contacto"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Juan García"
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ej: +34 600 123 456"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: juan@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ej: Calle Mayor 10, Madrid"
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={() => navigate("/")}>
              Cancelar
            </button>
            <button type="submit">
              {id ? "Guardar cambios" : "Crear contacto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;