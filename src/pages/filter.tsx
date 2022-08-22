import React from "react";
import IconCard from "../common/icons/IconCard";
import IconList from "../common/icons/IconList";

interface PropType {
    filter: string,
    doAction: React.Dispatch<React.SetStateAction<string>>
}

const FilterView = ({
    filter,
    doAction
}: PropType) => {
    return (
    <div className='flex'>
        {console.log(filter)}
        <div className={`pl-3 pr-2 py-2 rounded-tl-3xl rounded-bl-3xl cursor-pointer bg-site-6
						 ${filter == 'card' ? 'bg-site-6' : 'bg-site-4'}`}
            onClick={() => doAction(filter = 'card')}
            data-tip="Kártyanézet">

            <IconCard fillColor={filter == 'card' ? '#f4f8f7' : '#6b78a4'} />
        </div>

        <div className={`pl-2 pr-3 py-2 rounded-tr-3xl rounded-br-3xl cursor-pointer
						 ${filter == 'list' ? 'bg-site-6' : 'bg-site-4'}`}
            onClick={() => doAction(filter = 'list')}
            data-tip="Listanézet">

            <IconList fillColor={filter == 'list' ? '#f4f8f7' : '#6b78a4'} />
        </div>
    </div>
    )
}

export default FilterView;