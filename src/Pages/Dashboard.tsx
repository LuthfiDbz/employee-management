// Dashboard.tsx
import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ResponsivePie } from '@nivo/pie'
import React, { useEffect, useState } from "react"; // bahkan meskipun tidak dipakai, ini menjadikannya module
import GroupsIcon from '@mui/icons-material/Groups';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { ResponsiveBar } from "@nivo/bar";
import employeeApi from "../Api/employeeApi";

interface SummaryData {
  title: string,
  value: string | number,
  icon: React.ReactNode
}

type Column = {
  name: string;
  key: string;
  icon?: any;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

const summaryData: SummaryData[] = [
  {
    title: "Total Employee",
    value: 40,
    icon: <GroupsIcon color="info" fontSize="large"/>
  },
  {
    title: "Total Active Employee",
    value: 36,
    icon: <InterpreterModeIcon color="success" fontSize="large"/>
  },
  {
    title: "Total Gross Salary",
    value: "$" + "10,350.00",
    icon: <PaymentsIcon color="error" fontSize="large"/>
  },
  {
    title: "Total Take Home Pay",
    value: "$" + "9,566.45",
    icon: <AccountBalanceWalletIcon color="secondary" fontSize="large"/>
  },
]

const pieData = [
  {
    "id": "Marketing",
    "label": "Marketing",
    "value": 5,
    "color": "hsl(149, 70%, 50%)"
  },
  {
    "id": "Engineering",
    "label": "Engineering",
    "value": 10,
    "color": "hsl(37, 70%, 50%)"
  },
  {
    "id": "Legal",
    "label": "Legal",
    "value": 4,
    "color": "hsl(73, 70%, 50%)"
  },
  {
    "id": "Finance",
    "label": "Finance",
    "value": 6,
    "color": "hsl(246, 70%, 50%)"
  },
  {
    "id": "Operations",
    "label": "Operations",
    "value": 15,
    "color": "hsl(96, 70%, 50%)"
  }
]

const barData = [
  {
    "days": "Mon",
    "present": 37,
    "absent": 4,
    "leave": 9,
  },
  {
    "days": "Tue",
    "present": 38,
    "absent": 0,
    "leave": 2,
  },
  {
    "days": "Wed",
    "present": 35,
    "absent": 2,
    "leave": 3,
  },
  {
    "days": "Thu",
    "present": 30,
    "absent": 2,
    "leave": 8,
  },
  {
    "days": "Fri",
    "present": 40,
    "absent": 0,
    "leave": 0,
  },
  {
    "days": "Sat",
    "present": 25,
    "absent": 5,
    "leave": 10,
  }
]

const columns: Column[] = [
  { 
    name: 'Name', 
    key: 'firstName' , 
    render: (value, record) => (
      <div className='flex items-center gap-4'>
        <img src={record?.image} alt=""  width={45} height={45}/>
        <div>
          <Typography variant="subtitle1" fontWeight="bold" >{value} {record?.lastName}</Typography>
          <Typography variant="subtitle2" fontWeight={500} color="gray">{record?.company?.title}</Typography>
        </div>
      </div>)
  },
  { name: 'Job Title', key: '', align: 'center', render: (_, record) => (
    record?.id % 2 == 0 ?
      <Chip label="Active" variant="filled" color="success" />
      : 
      <Chip label="Inactive" variant="filled" color="error" />
  ) },
]

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState<any>([])

  useEffect(() => {
    getAllEmployees()
  }, [])

  const getAllEmployees = async () => {
    setLoading(true)
    try {
      const res = await employeeApi.getEmployee({limit: 10});

      const data = res.data;
      setEmployeeData(data)
    } catch (error: any) {
      console.log(error)
      // setAlert({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mt-2">
      <Box>
        <Grid container justifyContent="space-between" gap={4} wrap="nowrap">
          {summaryData.map((data, index) => (
            <Card className="w-1/4">
              <CardContent className="!py-4 !px-4">
                <div className="p-2 bg-light w-fit rounded mb-2">{data?.icon}</div>
                <Typography variant="subtitle2">{data?.title}</Typography>
                <Typography variant="h5" className="!font-semibold !mt-2">{data?.value}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Box>
      <br />
      <Box>
        <Grid container justifyContent="space-between" wrap="nowrap" gap={4}>
          <Grid container justifyContent="space-between" className="w-[60%]" gap={4}>
            <Card className="w-full">
              <CardContent className="!pb-6 !px-4 h-96">
                <Typography variant="h6" className="!font-semibold">Employee by Department</Typography>
                <ResponsivePie
                  data={pieData}
                  margin={{ top: 40, right: 300, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.6}
                  cornerRadius={2}
                  activeOuterRadiusOffset={8}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#000"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                  legends={[
                      {
                          anchor: 'top-right',
                          direction: 'column',
                          translateY: 0,
                          translateX: 200,
                          itemWidth: 50,
                          itemHeight: 45,
                          symbolShape: 'circle'
                      }
                  ]}
                />
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent className="!pb-6 !px-4 h-96">
                <Typography variant="h6" className="!font-semibold">Daily Attendance</Typography>
                <ResponsiveBar /* or Bar for fixed dimensions */
                  data={barData}
                  keys={['present', 'absent', 'leave']}
                  indexBy="days"
                  groupMode="grouped"
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                   enableLabel={false}
                  colors={{ scheme: 'category10' }}
                  legends={[
                      {
                          dataFrom: 'keys',
                          anchor: 'bottom',
                          direction: 'row',
                          // translateX: 120,
                          translateY: 60,
                          itemsSpacing: 3,
                          itemWidth: 100,
                          itemHeight: 16
                      }
                  ]}
                  // axisBottom={{ legend: 'days', legendOffset: 32 }}
                  // axisLeft={{ legend: 'food', legendOffset: -40 }}
                  margin={{ top: 50, right: 50, bottom: 100, left: 50 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid container justifyContent="space-between" className="w-[40%]">
            <Card className="w-full">
              <CardContent className="!pb-6 !px-4 h-fit">
                <Typography 
                  variant="h6" 
                  className="!font-semibold flex justify-between items-center gap-3" 
                >
                  Employee List 
                  <span className="text-sm underline">
                    <a href="/employee">
                      <Button
                        variant="contained"
                        size="medium"
                        // type="submit"
                        sx={{ textTransform: 'none', paddingBlock: '0.3rem', marginLeft: '1rem'}}
                        className="!bg-secondary-500 !text-black"
                      >
                        View All
                      </Button>
                    </a>
                  </span>
                </Typography>
                <br />
                <Divider />
                <TableContainer  className='mt-5 !bg-white' >
                  <Table  aria-label="simple table" size="small" sx={{
                    borderCollapse: "collapse", // rapatkan table
                    "& td, & th": { border: "none" }, // hilangkan border cell
                  }}>
                    {/* <TableHead>
                      <TableRow>
                        {columns?.map(col => {
                          return (
                            <TableCell className='!text-black !text-center'>{col?.icon} {col?.name}</TableCell>
                          )
                        })}
                      </TableRow>
                    </TableHead> */}
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={columns.length} align="center">
                            <div className="flex justify-center items-center py-5">
                              <CircularProgress size={24} />
                              <span className="ml-2">Loading...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : employeeData?.length < 1 ? (
                        <TableRow>
                          <TableCell colSpan={columns.length} align="center">
                            <div className="py-5 text-gray-400">No data available</div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        employeeData?.users?.map((row:any, index: number) => (
                          <TableRow
                            key={row.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            {columns.map((col) => (
                              <TableCell className={`!text-${col?.align}`}>
                                {col.render
                                  ? col.render(row[col.key], row, index)
                                  : row[col.key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
