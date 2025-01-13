import React, {useState, useEffect} from 'react'
import api from '../services/api';
import {useNavigate} from 'react-router-dom';

const PaymentModal = ({amount, startPayment, setStartPayment}) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentObject, setPaymentObject] = useState({
    payment_method: 'Credit Card',
    card_number: '',
    card_passcode: '',
    coupon: ''
  });

  const navigate = useNavigate();
  
  const handleCloseModal = () => {
    console.log("closing ther modal");
    setStartPayment(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentObject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handlePayment = async (paymentObject) => {
    console.log(`Processing payment: ${amount}`);
    setLoading(false);
    try{
    const responseBody = {
        "amount_to_pay": amount,
        "payment_method": paymentObject.payment_method, //'Account not implemented yet'
        "card_number": paymentObject.card_number,
        "card_passcode": paymentObject.card_passcode,
        // "coupon": paymentObject.coupon
    }
    const response = await api.post("vehicles/pay_charges/", responseBody);
    console.log(response.data);
    setMessage(response.message || "Payment Successful.");
    setStartPayment(false);
    setTimeout(()=>{navigate("/home");}, 1000)
    }catch(error){
        if (error.response && error.response.data)
            setMessage(error.response.data.message || "Payment failed.");
    }
  };

  return (
    <>
        {startPayment && (
        <div className="modal">
            <div className="modal-content">
            <button onClick={handleCloseModal}>X</button>
            <h3>Payment: {amount}</h3>

        <div>
            <label><input type="radio" name="payment_method" value="Credit Card" checked={paymentObject.payment_method === 'Credit Card'} onChange={handleChange}/>Credit Card</label>
            <label><input type="radio" name="payment_method" value="Account" checked={paymentObject.payment_method === 'Account'} onChange={handleChange}/>Account</label>
        </div>

        {paymentObject.payment_method === 'Credit Card' && (
        <>
          <div>
            <label>Card Number:
                <input type="text" name="card_number" value={paymentObject.card_number} onChange={handleChange} required/>
            </label>
          </div>
          <div>
            <label>Card Passcode:
              <input type="text" name="card_passcode" value={paymentObject.card_passcode} onChange={handleChange} required/>
            </label>
          </div>
        </>
      )}

      <div>
        <label>Coupon Code:
          <input type="text" name="coupon" value={paymentObject.coupon} onChange={handleChange}/>
        </label>
      </div>
      <p>progress: {message && <p>{message || 'None'}</p>} </p>
      <button onClick={() => handlePayment(paymentObject)} className="btn-confirm">Confirm</button>
      <button onClick={handleCloseModal} className="btn-cancel">Cancel</button>
      </div>
    </div>
)}

    </>
    )
}

export default PaymentModal