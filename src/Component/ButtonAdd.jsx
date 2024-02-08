import React from 'react';


const ButtonAdd = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn font-serif border-2 border-black hover:bg-cyan-300 w-20 ml-6">
      Add
    </button>
  );
};

export default ButtonAdd;