import * as React from 'react';
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import '../Css/report_css.css'
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import Combobox from "react-widgets/Combobox";

export const Report = () => {
  
  const [dataList, setDataList] = React.useState([]);
  

  React.useEffect(() => {
    fetch("https://dentaldriversteam.herokuapp.com/api/v1/reports", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },  
      body: JSON.stringify({
        clientName: 'Moj zubar',
        dateFrom: '2022-05-18',
        dateTo: '2022-06-12'
    })})
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setDataList(data);
    });
  }, []);

  const result = dataList.reduce((total, currentValue) => total = total + currentValue.amount,0);
  const client = [{id:1, name: 'Moj zubar'}];
  const options = ['']

  const [value, setValue] = React.useState(options[0]);

  const contentArea = React.useRef(null);

  const  handleExportWithComponent  = (event) => {
    /*pdfExportComponent.current.save();*/
    savePDF(contentArea.current, { paperSize:  "A4",  fileName: 'report.pdf' });
}
  
  return (
      <Box>
        <Box style = {{marginLeft:  '10px', display: 'flex'}}>
          <Grid container >
            <Grid item xs={6}>
                <h1>Report search</h1>
            </Grid>
            <Grid item xs={6} style = {{marginTop:'21px', display: 'flex', justifyContent:  'flex-end', alignItems: 'end'}}>
              <Button  type="submit" variant="contained" style={{backgroundColor:'black', borderRadius: '20px' }} >Final report</Button>
            </Grid>
          </Grid>
        </Box>
        <div style={{ borderTop: "2px solid black ", marginLeft: 10, marginRight: 10, marginTop: 0 }}></div>

        <Box style = {{marginLeft:  '10px',  display: 'flex'}}>
        <Grid container >
            <Grid item xs={3} style={{padding: '10px'}}>
                <label>Client</label>
                <Autocomplete
                  value='Moj zubar'
                
                  options={options}
                  style={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField {...params}  variant="outlined" defaultValue='test' />}
                />
            </Grid>
            <Grid item xs={3}  style={{padding: '10px'}} >
                <label>From<span style={{color:  'red'}}>*</span></label>
                <TextField
                  type="date"
                  defaultValue='2022-05-18'
                  fullWidth
                  id="dateFrom"
                  name="dateFrom"
                  placeholder='dateFrom...'
                  autoComplete="dateFrom" 
                  
                />
            </Grid>
            <Grid item xs={3}  style={{padding: '10px'}}>
                <label>To<span  style ={{color:  'red'}}>*</span></label>
                <TextField
                  type="date"
                  defaultValue='2022-06-12'
                  fullWidth
                  id="dateTo"
                  name="dateTo"
                  placeholder='dateTo...'
                  autoComplete="dateTo" 
                  
                />
            </Grid>
            <Grid item xs={3}  style={{display:'flex', alignItems: 'center', padding:  '10px', marginTop:  '20px'}}>
              <Button  type="submit" variant="contained" style={{backgroundColor:'black', borderRadius: '20px' }} >Submit</Button>
            </Grid>
          </Grid>
        </Box>
        <div className="App" ref={contentArea}>
          <table >
            <tr >
              <th style={{width: '5%', borderLeft: '0px'}}>No</th>
              <th >From</th>
              <th>To</th>
              <th>Direct</th>
              <th>Paid</th>
              <th>Bill date</th>
              <th>Amount</th>
            </tr>
            {dataList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.key}</td>
                  <td>{val.nameClientFrom}</td>
                  <td>{val.nameClientTo}</td>
                  <td>{val.direct}</td>
                  <td>{val.paid}</td>
                  <td>{val.dateBill}</td>
                  <td>{val.amount}</td>
                </tr>
              )
            })}
            <tr >
              <th style={{width: '5%', borderLeft: '0px', borderTop: 'solid 1px'}}></th>
              <th style = {{borderTop: '1px solid'}} ></th>
              <th style = {{borderTop: '1px solid'}}></th>
              <th style = {{borderTop: '1px solid'}}></th>
              <th style = {{borderTop: '1px solid'}}><Button  type="submit" variant="contained" style={{backgroundColor:'black', borderRadius: '20px'}}  onClick={handleExportWithComponent} >toPdf</Button></th>
              <th style = {{borderTop: '1px solid'}}>Total amount</th>
              <th style = {{borderTop: '1px solid'}}>{result}</th>
            </tr>
          </table>
        </div>
      </Box>
  );
}