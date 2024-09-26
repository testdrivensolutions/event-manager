import React, { useMemo, useState } from "react";
import { TextField, TablePagination } from "@mui/material";
import { resources } from "./data";
import {
  MonthYear,
  EventManager,
  ClickData,
  Page,
  Resource,
  getYearAndMonth,
} from "./";

const App = () => {
  const [page, setPage] = useState<Page>({
    current: 0,
    size: 10,
    count: Math.ceil(resources.length / 10),
    total: resources.length,
  });
  const [data, setData] = useState<Resource[]>([]);
  const [monthYear, setMonthYear] = useState<MonthYear>(getYearAndMonth());
  const [loading, setLoading] = useState(false);

  // This can be any async fetch function
  // This function is triggered my page change
  useMemo(() => {
    setLoading(true);
    setTimeout(() => {
      const data = resources.slice(
        page.current * page.size,
        (page.current + 1) * page.size,
      );
      setData(data);
      setLoading(false);
    }, 500);
  }, [page, monthYear]);

  const handleClick = (data: ClickData | undefined) => {
    console.log(data);
  };

  const handleUpdateDate = (date: MonthYear) => {
    console.log(date);
    setMonthYear(date);
  };

  const handleSearch = (text: string) => {
    console.log(text);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage({ ...page, current: newPage });
  };
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPage({ ...page, size: Number(e.target.value) });
  };

  return (
    <div className='app'>
      <EventManager
        resources={data}
        tableId={1}
        search={
          <TextField
            variant='standard'
            label='Search'
            sx={{
              margin: "0 0 24px",
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        pagination={
          <TablePagination
            component='div'
            count={page.total}
            page={page.current}
            onPageChange={handleChangePage}
            rowsPerPage={page.count}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
        actionsPossition='top'
        showLegend
        showTooltip
        loading={loading}
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </div>
  );
};

export default App;
