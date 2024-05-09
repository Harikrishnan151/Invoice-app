import React, { useEffect, useState } from 'react'
import './Main.css'
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { MdDelete } from "react-icons/md";

function MainPage() {

  const [datas, setDatas] = useState([])
  const [inputData, setInputData] = useState([{ itemId: "", itemName: "", price: "", Tax: "", subTotal: "" }])
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [Total, setTotal] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('')
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);



  const handleClick = () => {
    setInputData([...inputData, { itemId: "", itemName: "", price: "", Tax: "", subTotal: "" }])
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target
    const onChangeVal = [...inputData]
    onChangeVal[i][name] = value
    setInputData(onChangeVal)

  }

  const handleDelete = (i) => {
    const deleteVal = [...inputData]
    deleteVal.splice(i, 1)
    setInputData(deleteVal)
  }

//add Invoice function call
  const addInvoice = () => {
    const calculateSubtotal = (price) => {
      const tax = 5; 
      return (price / 100) * tax;
    };
    const updatedItems = inputData.map(item => {
      const subTotal = calculateSubtotal(parseFloat(item.price));
      return { ...item, subTotal };
    });
    const Total = updatedItems.reduce((acc, item)=> acc+ parseFloat(item.price), 0);

  
    const grandTotal = Total + Total * 0.05;

    const newInvoice = {
      invoiceNo,
      date,
      Total,
      grandTotal,
      items: updatedItems
    };

    setInvoices([...invoices, newInvoice]);
    console.log(invoices);

    setInvoiceNo('');
    setDate('');
    setTotal('');
    setGrandTotal('');
    setInputData([{ itemId: '', itemName: '', price: '', Tax: '', subTotal: '' }]);

    toggleOpen()
  };

    //function to search invoice based item name
    const filterData = invoices.filter(invoice =>invoice.items.some(item =>item.itemName.toLowerCase().includes(search.toLowerCase())));

    console.log(filterData);


  return (
    <div className='main-container'>
      <div className="container">
        <div className="heading mt-5">
          invoice
        </div>
        <div className="sub-container">
          <div className="createbtn">
            <button onClick={toggleOpen} className='btns mx-2'>Create</button>
          </div>
          <div className="searchbar mx-5">
            <MDBInput value={search} onChange={(e) => setSearch(e.target.value)} label="Search invoice by item name" id="form1" type="text" />
            <button  className='btns mx-2'>search</button>
          </div>
        </div>
        <div className="table">
          <MDBTable align='middle'>
            <MDBTableHead className='tableHead'>
              <tr>
                <th scope='col'>Invoice No</th>
                <th scope='col'>Date</th>
                <th scope='col'>Item Name</th>
                <th scope='col'>Total</th>
                <th scope='col'>Tax</th>
                <th scope='col'>Grand Total</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className='tableBody'>
              {
                filterData.length > 0 ?filterData.map((invoice) => (
                  <React.Fragment key={invoice.invoiceNo}>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td>{invoice.invoiceNo}</td>
                        <td>{invoice.date.slice(8, 10)}-{invoice.date.slice(5, 7)}-{invoice.date.slice(0, 4)}</td>
                        <td>{item.itemName}</td>
                        <td>{invoice.Total}</td>
                        <td>5.00</td>
                        <td>{invoice.grandTotal}</td>
                      </tr>
                    ))}

                  </React.Fragment>
                )):<tr>
                  <td></td>
                  <td></td>
                  <td>No Invoice Available</td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>

                
              }

            </MDBTableBody>
          </MDBTable>

        </div>
        <div className='modalBody' >

          <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
            <MDBModalDialog centered size="xl">
              <MDBModalContent>
                <MDBModalHeader className='modalHeader'>
                  <MDBModalTitle >Create Invoice</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody style={{ padding: '0px' }}>
                  <div className="modalBody">
                    <div className='modalInputs'>
                      <div>

                        <div className="inputs mx-4">
                          <label className='mx-1'>Invoice No</label>
                          <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} type="Number" />
                          <label className='mx-1'>Date</label>
                          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
                        </div>
                      </div>


                    </div>
                    <div className="addBtn">
                      <button onClick={handleClick} className='invoiceAdd mx-5 my-2'>Add</button>
                    </div>
                  </div>
                  <div className="modalTable">
                    
                    <MDBTable align='middle' className='main-table' >
                      <MDBTableHead className='tableHead'>
                        <tr>
                          <th  scope='col'>Item ID</th>
                          <th scope='col'>Item Name</th>
                          <th scope='col'>Price</th>
                          <th  scope='col'>Tax</th>
                          <th scope='col'>Sub Total</th>
                          <th scope='col'>Delete</th>

                        </tr>
                      </MDBTableHead>
                      <MDBTableBody className='tableBody'>
                        {
                          inputData.map((val, i) =>

                            <tr>
                              <td >
                                <input className='addInputs' name='itemId' value={val.itemId} onChange={(e) => handleChange(e, i)} />
                              </td>
                              <td>
                                <input className='addInputs' name='itemName' value={val.itemName} onChange={(e) => handleChange(e, i)} />

                              </td>
                              <td>
                                <input className='addInputs' name='price' value={val.price} onChange={(e) => handleChange(e, i)} />
                              </td>
                              <td>
                                <input className='addInputs' name='Tax' value='5.00%' onChange={(e) => handleChange(e, i)} />
                              </td>
                              <td>
                                <input className='addInputs' name='subTotal' value={val.subTotal} onChange={(e) => handleChange(e, i)} />

                              </td>
                             <td>
                             <span className='mt-5' onClick={() => handleDelete(i)}><MdDelete /></span>
                             </td>
                            </tr>
                          )

                        }
                      </MDBTableBody>

                    </MDBTable>
                    <div style={{ marginTop: '-16px' }} className="modalCaculations pt-3">
                      <div>
                        <label className='mx-2 my-2'>Total Price</label>
                        <input value={Total} type="number" readOnly />
                      </div>
                      <div>
                        <label className='mx-3 my-2'>Total Tax</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label className='mx-2 my-2'>Grand Total</label>
                        <input value={invoices.grandTotal} type="number" readOnly />
                      </div>
                      <div className="savebtn">
                        <button onClick={addInvoice} className='invoiceSavebtn mx-5 '>Save</button>
                      </div>
                    </div>


                  </div>

                </MDBModalBody>
                {/* <MDBModalFooter>
                  <MDBBtn color='secondary' onClick={toggleOpen}>
                    Close
                  </MDBBtn>
                  <MDBBtn>Save changes</MDBBtn>
                </MDBModalFooter> */}
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

        </div>

      </div>
    </div>
  )
}

export default MainPage