import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import roomieService from '../../services/roomie.service';

export default function Roomies() {
  const [roomies, setRoomies] = useState([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    try {
      const roomies = await roomieService.get()
      setRoomies(roomies)
      setNewName('')
      console.log(roomies)
    } catch (error) { console.error(error) }
  }

  async function newUser(name) {
    try {
      await roomieService.save({
        name: name
      })
      refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="f-col" style={{ gap: 8 + 'px' }}>
      {roomies.map(roomie =>
        <div className="f-row" style={{gap: 8 + 'px'}}>
          <span>{roomie.name}</span>
          <FontAwesomeIcon icon={faXmark}/>
        </div>)
      }
      <div className="f-row">
        <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
        <button  onClick={e => newUser(newName)}>Nuevo usuario</button>
      </div>
    </div>
  )
}