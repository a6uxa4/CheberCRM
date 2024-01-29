import { Select, Option } from '@material-tailwind/react'
import { SelectItem, Select as SelectNext } from '@nextui-org/react'

interface SelectDefaultProps {
  option: { label: string; value: number; [key: string]: any }[]
  label: string
  type?: 'select' | 'multiselect'
  placeholder?: string
}

export function SelectDefault(props: SelectDefaultProps) {
  if (props.type === 'multiselect')
    return (
      <SelectNext
        {...props}
        selectionMode='multiple'
        className='w-full border-[#B0BEC5] border-[1px] rounded-xl'
        classNames={{
          trigger: 'bg-[#f9fafb] hover:!bg-[#f9fafb] cursor-pointer',
          selectorIcon:
            'stroke-[#899ca8] w-[15px] h-[15px] stroke-[4px] font-extrabold'
        }}
      >
        {props.option.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectNext>
    )

  return (
    <Select
      menuProps={{
        className: 'max-h-[200px]'
      }}
      placeholder={'SelectDefault'}
      className='w-full'
      {...props}
    >
      {props.option.map(item => (
        <Option key={item.value}>{item.label}</Option>
      ))}
    </Select>
  )
}
