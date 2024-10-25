import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { publicOfEvent } from "../../../../data/publicOfEvent"
 
type Props = {
  setValue: React.Dispatch<React.SetStateAction<string[]>>,
  value: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  selected: string[]
}
 
function ComboboxPublic({value, setValue, selected, setSelected}:Props) {
  const [open, setOpen] = React.useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          Selecione os tipos de seu evento
          <ChevronsUpDown className="ml-2 h-4 w-16 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Pesquise dentre os tipos." />
          <CommandList>
            <CommandEmpty>Não foi achado os tipos de evento</CommandEmpty>
            <CommandGroup>
              {publicOfEvent.map((publicOfEvent) => (
                <CommandItem
                  key={publicOfEvent.value}
                  value={publicOfEvent.value}
                  onSelect={(currentValue) => {
                    !selected.includes(currentValue) &&
                    setSelected([...selected, currentValue])
                    console.log(selected)
                  }}
                >
                  {publicOfEvent.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxPublic;