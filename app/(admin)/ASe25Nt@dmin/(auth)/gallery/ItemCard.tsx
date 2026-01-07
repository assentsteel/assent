import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const ItemCard = ({title,id}: {title:string,index:number,id:string}) => {
  const {attributes, listeners, setNodeRef, transform} = useSortable({
    id,
})
    const style = {
        transition: 'transform 0.2s ease-in-out',
        transform: CSS.Transform.toString(transform),
    }
  return (
    <div ref={setNodeRef} style={style} className="relative h-40 border p-2" id={id} {...attributes} {...listeners}>
                                    <div>
                                <p className="text-[16px]">{title}</p>
                            </div>
                                </div>
  )
}

export default ItemCard