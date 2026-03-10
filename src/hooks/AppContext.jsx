import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const API_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "khalid"; 

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

const loadContacts = async () => {
    try {
      const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);
      
      if (resp.status === 404) {
        await fetch(`${API_URL}/agendas/${AGENDA_SLUG}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        setContacts([]);
        return;
      }

      const data = await resp.json();
      setContacts(data.contacts ?? data);
    } catch (err) {
      console.error(err);
    }
  };

  const addContact = async (contactData) => {
    try {
      const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!resp.ok) throw new Error("Error al crear contacto");
      await loadContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!resp.ok) throw new Error("Error al actualizar contacto");
      await loadContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error al eliminar contacto");
      await loadContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider value={{ contacts, loadContacts, addContact, updateContact, deleteContact }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);