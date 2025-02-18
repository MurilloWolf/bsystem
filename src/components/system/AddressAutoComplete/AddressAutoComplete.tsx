"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import fetchSuggestions, {
  formatSuggestions,
} from "@/lib/SuggestLocation/getSuggetsLocation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { SuggestCity } from "@/lib/SuggestLocation/types";
import { FormItem, FormLabel } from "@/components/ui";

type AddressAutoCompleteProps = {
  onSelect: (selectedCity: SuggestCity) => void;
  placeHolder?: string;
  label?: string;
};

export default function AddressAutoComplete(props: AddressAutoCompleteProps) {
  const { onSelect, placeHolder = "", label } = props;
  const [cities, setCities] = useState<SuggestCity[]>([]);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [serachValue] = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchSuggestions(serachValue);
      if (data.success) {
        const formated = formatSuggestions(data.features);
        setCities(formated);
      }
    }
    if (serachValue) {
      fetchData();
    } else {
      setCities([]);
    }
  }, [serachValue]);

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[200px] w-full justify-between"
          >
            {value
              ? cities.find((city) => city.value === value)?.label
              : placeHolder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              onValueChange={(value) => setSearch(value)}
              value={search}
              placeholder="Pesquisar"
            />
            <CommandList>
              <CommandEmpty className="p-4 px-2 text-center text-xs">
                Busque pelo nome das cidades
              </CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelect(
                        cities.find(
                          (city) => city.value === currentValue
                        ) as SuggestCity
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
