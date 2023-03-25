import React from 'react';

export const GlobalFilter = ( {filter, setFilter} ) =>{
	return(
		<div>
			Search : {' '}
			<input className="ml-2 input-search form-control col-md-2 col-8"
				value={filter || ''}  onChange={e => setFilter(e.target.value)} 
            />
		</div>
	)
} 