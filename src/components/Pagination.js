import React from "react";

function Pagination({currentPage, totalResults,onPageChange }) {
  console.log("pagiation called ");
  const totalPages = Math.ceil(totalResults / 20);

  function handlePrevious(){
    (currentPage === 1 )? onPageChange(totalPages) : onPageChange((prev)=>prev-1)
  }
  function handleNext(){
    (currentPage === totalPages)? onPageChange(1) :onPageChange((prev)=> prev+1)
  }
  function paginationwindow(){
    let start = Math.max(1, Math.floor((currentPage-1)/10) *10+1)
    let end = Math.min(start + 10-1, totalPages)
    return {start, end}
  }
const {start ,end } = paginationwindow()
  return (
    <div className="m-2">
        <span className="mx-1 cursor-pointer"  onClick={()=>handlePrevious()}>◀</span>
     {Array.from ({length:end - start+1}, (_,index) =>{
      const pageNumber = start + index
      return (
        <button
        key={pageNumber}
        onClick={()=>onPageChange(pageNumber)}
        className={`px-4 py-2 rounded ${
          currentPage === pageNumber 
            ? 'bg-blue-500 text-white' 
            : 'hover:bg-gray-100'
        }cursor-pointer font-semibold`}
        >
          {pageNumber}
        </button>
      )
     })}
      <span className="mx-1 cursor-pointer" onClick={()=>handleNext()}>▶</span>
    </div>
  );
}

export default Pagination;
