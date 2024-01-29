import { Select, Option } from '@material-tailwind/react'

interface SelectDefaultProps {
  option: { label: string; value: number; [key: string]: any }[]
  label: string
}

export function SelectDefault(props: SelectDefaultProps) {
  return (
    <Select
      menuProps={{
        className: 'max-h-[200px]'
      }}
      className='max-h-[250px]'
      placeholder={'SelectDefault'}
      {...props}
    >
      {props.option.map(item => (
        <Option key={item.value}>{item.label}</Option>
      ))}
    </Select>
  )
}
