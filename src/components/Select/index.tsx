import { SelectItem, Select as SelectNext } from '@nextui-org/react'

interface SelectDefaultProps {
  option: { label: string; value: number; [key: string]: any }[]
  label: string
  type?: 'single' | 'multiple'
  placeholder?: string
  value: string
  onChange: (value: any) => void
}

export function SelectDefault(props: SelectDefaultProps) {
  return (
    <SelectNext
      {...props}
      value={props.value}
      selectionMode={props.type}
      size='sm'
      classNames={{
        mainWrapper: 'border-[#B0BEC5] border-[1px] rounded-xl',
        trigger: 'bg-[#f9fafb] hover:!bg-[#f9fafb] cursor-pointer rounded-xl',
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
}
