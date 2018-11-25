import React from 'react';

const UpdateDeckButton = ({ submitChanges }) => (
  <div>
    <button className='button' onClick={ submitChanges }>Submit Changes</button>
  </div>
);

export default UpdateDeckButton;