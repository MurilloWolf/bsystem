import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui";
import { InfoIcon } from "lucide-react";

export default function PanelsAnglesTemplate() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="rounded-full w-10 h-10 p-1"
        >
          <InfoIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-50 rounded-md p-4 flex justify-center items-center">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h6 className="text-lg font-medium leading-none">
              Gabarito de inclinações
            </h6>
            <p className="text-xs text-muted-foreground">
              Inclinações mais comuns para instalação de painéis fotovoltaicos
            </p>
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Telha Fibrocimento</TableCell>
                <TableCell>05°</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Telha Metálica</TableCell>
                <TableCell>10°</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Telha Ceramica</TableCell>
                <TableCell>15°</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Telha Francesa</TableCell>
                <TableCell>20°</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Solo/Laje</TableCell>
                <TableCell>25°</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </PopoverContent>
    </Popover>
  );
}
