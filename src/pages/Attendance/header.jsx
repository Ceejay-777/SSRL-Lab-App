export const header = [
  { Header: "S/N", accessor: "id" },
  { Header: "Date", accessor: "date" },
  { Header: "In", accessor: "in" },
  { Header: "Out", accessor: "out" },
];


import React from 'react'

const Header = () => {
  return (
    <div className='border flex text-xl font-bold text-center text-white bg-navBg2 border-y border-slate-400'>
      {
        header.map((head) => {
          return (
            <div className='border-x border-slate-400 p-2 flex-1'>{head.Header}</div>
          )
        })
      }
    </div>
  )
}

export default Header