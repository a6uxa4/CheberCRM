import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MiniCalendar } from '../Mini-calendar'
import { format } from 'date-fns'
import clsx from 'clsx'

export const DatePicker = ({
  label,
  scheduleData,
  endTime,
  onDate,
  onTime,
  values
}: {
  label: string
  scheduleData: { startTime: string; endTime: string }[]
  endTime?: string
  onDate: (e: string) => void
  onTime: (e: string) => void
  values: string
}) => {
  const [date, start] = values.split('~')
  const [isOpen, setIsOpen] = useState(false)
  const [newDate, setNewDate] = useState(new Date())
  const [value, setValue] = useState({
    time: '',
    date: ''
  })

  const togglePopover = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    if (date !== '') {
      onDate(date)
      setValue({ time: start, date: date })
    } else {
      onDate(format(newDate, 'yyyy-MM-dd'))
      setValue({ ...value, date: format(newDate, 'yyyy-MM-dd') })
    }
  }, [date])

  function handleChangeDate(date: Date) {
    setNewDate(date)
    onDate(format(date, 'yyyy-MM-dd'))
    setValue({ ...value, date: format(date, 'yyyy-MM-dd') })
  }

  function handleChangeTime(time: string) {
    onTime(time)
    setValue({ ...value, time: time })
    setIsOpen(false)
  }

  return (
    <Popover placement='bottom' onOpenChange={togglePopover} isOpen={isOpen}>
      <PopoverTrigger>
        <div className='group bg-[#f9fafb] w-full h-fit flex flex-col px-3 py-2 rounded-xl items-start relative cursor-pointer border-[1px] border-[#B0BEC5]'>
          <label
            htmlFor='FieldDate'
            className='text-[12px] text-[#52525B] font-sans leading-5 pr-[8px]'
          >
            {label}
          </label>
          <input
            id='FieldDate'
            className='w-full max-w-[90%] outline-none text-[14px] bg-[#f9fafb] text-[#455a64]'
            readOnly
            placeholder='ГГГГ-ММ-ДД ~ ЧЧ-MM-СС'
            value={`${value.date} ~ ${value.time} ${
              endTime !== '' ? '-' : ''
            } ${endTime}`}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='#899ca8'
            width={20}
            height={20}
            className={clsx(
              'absolute right-3 top-[40%] transition-transform duration-150',
              {
                'rotate-180': isOpen
              }
            )}
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className='w-full h-full flex'>
          <MiniCalendar
            newDate={newDate}
            setNewDate={e => handleChangeDate(e)}
          />
          <div className='flex items-center justify-center gap-1'>
            <ScrollShadow
              className={clsx(
                'w-[120px] h-[260px] flex flex-col gap-2 border-l pl-2 py-5 items-center justify-center',
                {
                  '!justify-start': scheduleData.length
                }
              )}
            >
              {scheduleData.length ? (
                scheduleData.map((item: any) => (
                  <span
                    onClick={() => handleChangeTime(item.startTime)}
                    key={item.startTime}
                    className='bg-green-50 text-black px-2 py-1 rounded-md w-full flex items-center justify-center hover:bg-[#31a010] hover:text-white cursor-pointer'
                  >
                    {item.startTime}
                  </span>
                ))
              ) : (
                <span className='text-center'>Свободного времени нет !</span>
              )}
            </ScrollShadow>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
