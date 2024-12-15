import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function TableDemo() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const today = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddedDays = Array((firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1))
    .fill(null)
    .concat(days);

  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  const handleCellClick = (day) => {
    setSelectedDate(day);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest(".side-panel") === null) {
      closePanel();
    }
  };
  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onClick={handleOutsideClick}
    >
      {/* Calendar Container with Dynamic Width */}
      <div
        className={`h-full transition-all duration-300 ${
          isPanelOpen ? "w-[calc(100%-20rem)]" : "w-full"
        }`}
      >
        <Table className="w-full h-full m-0 overflow-auto border border-gray-300 table-fixed">
          <TableCaption>
                {today.toLocaleString("default", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <TableHead
                  key={index}
                  className="p-5 text-center border border-gray-300"
                >
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="h-full">
            {weeks.map((week, index) => (
              <TableRow key={index}>
                {week.map((day, i) => (
                  <TableCell
                    key={i}
                    className={`text-center p-9 cursor-pointer border border-gray-300 ${
                      day
                        ? "text-black"
                        : "text-transparent cursor-default"
                    } ${
                      day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      day && handleCellClick(day);
                    }}
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 border border-gray-300">
                <div className="flex items-center justify-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 text-sm bg-gray-100 rounded">
                      {`${months[currentMonth]} 🔽`}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                      {months.map((month, index) => (
                        <DropdownMenuItem key={index} onClick={() => handleMonthChange(index)}>
                          {month}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 text-sm bg-gray-100 rounded">
                      {`${currentYear} 🔽`}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="relative w-24 overflow-y-auto h-80">
                      {Array.from({ length: 101 }, (_, idx) => (
                        <DropdownMenuItem 
                          key={idx} 
                          onClick={() => handleYearChange(currentYear - 50 + idx)}
                        >
                          {currentYear - 50 + idx}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                      <button
                        onClick={() => {
                          setCurrentMonth(currentMonth - 1);
                          if (currentMonth < 0) {
                            setCurrentMonth(11);
                            setCurrentYear(currentYear - 1);
                          }
                        }}
                        className="p-2 text-sm bg-gray-100 rounded"
                      >
                        &larr;
                      </button>
                      <button
                        onClick={() => {
                          setCurrentMonth(currentMonth + 1);
                          if (currentMonth > 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                          }
                        }}
                        className="p-2 text-sm bg-gray-100 rounded"
                      >
                        &rarr;
                      </button>
                      <button onClick={() => {setCurrentMonth(new Date().getMonth()); setCurrentYear(new Date().getFullYear())}} className="p-2 text-sm bg-gray-100 rounded">
                        Reset
                      </button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 bg-white w-80 h-full shadow-lg transition-transform duration-300 ease-in-out transform ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-gray-300 side-panel`}
        style={{ zIndex: 100 }}
      >
        <div className="p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closePanel();
            }}
            className="absolute text-lg bg-transparent border-none top-2 right-4"
          >
            ❌
          </button>
          <h2 className="mb-4 text-2xl">Selected Date</h2>
          {selectedDate ? (
            <p className="text-xl">
              You selected: <strong>{selectedDate}</strong>
            </p>
          ) : (
            <p>No date selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
