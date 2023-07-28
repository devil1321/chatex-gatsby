import React from 'react'
import { useState } from 'react';
// @ts-ignore
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Widget = () => {
  
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='widget'>
       <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default Widget
