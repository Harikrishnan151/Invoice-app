import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { FaFileInvoice } from "react-icons/fa";

function Header() {
    return (
        <div>
            <MDBNavbar style={{backgroundColor:'#F6BDCF'}}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>
                      <FaFileInvoice className='mx-2'/>  Invoice-App
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}

export default Header