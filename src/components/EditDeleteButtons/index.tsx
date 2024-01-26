import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
interface EditDeleteButtonsProps {
  onEdit: (event: React.MouseEvent) => void
  onDelete: (event: React.MouseEvent) => void
  isUpdate?: boolean
}

export default function EditDeleteButtons({
  onEdit,
  onDelete,
  isUpdate
}: EditDeleteButtonsProps) {
  return (
    <div className='flex gap-1'>
      <div
        className='w-fit h-fit cursor-pointer rounded-full p-1.5 hover:bg-[gainsboro]/40'
        onClick={onDelete}
      >
        <AiOutlineDelete size={22} color='#9ba3af' />
      </div>
      {isUpdate || (
        <div
          className='w-fit h-fit cursor-pointer rounded-full p-1.5 hover:bg-[gainsboro]/40'
          onClick={onEdit}
        >
          <AiOutlineEdit size={22} color='#9ba3af' />
        </div>
      )}
    </div>
  )
}
