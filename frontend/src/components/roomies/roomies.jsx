import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import roomieService from '../../services/roomie.service';

export default function Roomies() {
  // States
  const [roomies, setRoomies] = useState([])
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState(null)

  // Hooks
  useEffect(() => {
    refresh()
  }, [])

  // Methods
  async function refresh(event) {
    try {
      if (event) event.preventDefault()
      const roomies = await roomieService.get()
      setRoomies(roomies)
      setNewName('')
    } catch (error) { console.error(error) }
  }

  async function newRoomie(name) {
    try {
      await roomieService.save({
        name: name
      })
      refresh()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteRoomie(id) {
    try {
      await roomieService.remove({
        id: id
      })
      refresh()
    } catch (error) {
      console.error(error)
    }
  }

  async function saveRoomie(roomie) {
    try {
      await roomieService.modify(roomie)
      refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setEditing(null)
    }
  }

  function updateName(e, roomie) {
    const updatedRoomies = roomies.map((r) => {
      if (r.id === roomie.id) {
        return { ...r, name: e.target.value };
      } else {
        return r;
      }
    });
    setRoomies(updatedRoomies);
  }

  return (
    <div className="f-col" style={{
      gap: 8 + 'px'
    }}>
      {roomies.map(roomie =>
        <div className="f-row" style={{ gap: 8 + 'px' }} key={roomie.id}>
          {editing !== roomie.id && <span>{roomie.name}</span>}
          {editing === roomie.id && <input type="text" value={roomie.name} onChange={e => updateName(e, roomie)}/>}
          {editing !== roomie.id && <FontAwesomeIcon icon={faPen} onClick={e => setEditing(roomie.id)} />}
          {editing !== roomie.id && <FontAwesomeIcon icon={faXmark} onClick={e => deleteRoomie(roomie.id)} />}
          {editing === roomie.id && <FontAwesomeIcon icon={faCheck} onClick={e => saveRoomie(roomie)} />}
        </div>)
      }
      <div className="f-row" onSubmit={e => refresh(e)}>
        <form>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
          <button onClick={e => newRoomie(newName)}>Nuevo usuario</button>
        </form>
      </div>
    </div>
  )
}