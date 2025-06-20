import React, { useRef } from 'react';

function Content() {
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const para = useRef();
  const radioCredit = useRef();
  const radioDebit = useRef();

  let setdata = JSON.parse(localStorage.getItem('product')) || [];
  function myfunc() {
    const x1 = text1.current.value;
    const x2 = text2.current.value;
    const x3 = text3.current.value;

    var errMsg = '';
    if (x1 == '' || x2 == '' || x3 == '') {
      errMsg = 'All values R required';
      para.current.className = 'alert alert-danger';
    } else if (isNaN(x1)) {
      errMsg = 'values Must be Number';
      para.current.className = 'alert alert-danger';
    } else {
      let paymentMode = '';
      if (radioCredit.current.checked) {
        paymentMode = radioCredit.current.value;
      } else if (radioDebit.current.checked) {
        paymentMode = radioDebit.current.value;
      }

      const newId = Date.now();
      const formdata = {
        id: newId,
        amount: x1,
        'date-of-birth': x2,
        salary: x3,
        paymentMode: paymentMode,
      };

      setdata.push(formdata);
      localStorage.setItem('product', JSON.stringify(setdata));
      text1.current.value = '';
      text2.current.value = '';
      text3.current.value = '';
      radioCredit.current.checked = false;
      radioDebit.current.checked = false;
      // console.log(setdata);
      errMsg = ' Correct All values Will be display in table formate ';
      para.current.className = 'alert alert-success m-5';
    }
    para.current.innerText = errMsg;
  }
  const storedata = [...setdata];
  // console.log(storedata);

  return (
    <div>
      <h1 className="text-center m-3">Expense Calculator</h1>
      <div className="container w-50 bg-light border rounded p-5">
        <label>Amount</label>
        <input
          type="text"
          ref={text1}
          className="form-control"
          placeholder="Amount"
        />
        <br />

        <label>Date of Birth</label>
        <input
          type="date"
          className="form-control"
          placeholder="Select date of birth"
          ref={text2}
        />
        <br />

        <label>Details</label>
        <input
          type="text"
          ref={text3}
          className="form-control"
          placeholder="Salary"
        />
        <br />

        <h3>Select payment mode: Credited/Debited</h3>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMode"
            id="credit"
            value="Credit"
            ref={radioCredit}
          />
          <label className="form-check-label" htmlFor="credit">
            Credit
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMode"
            id="debit"
            value="Debit"
            ref={radioDebit}
          />
          <label className="form-check-label" htmlFor="debit">
            Debit
          </label>
        </div>

        <button className="btn btn-sm bg-info text-center m-3" onClick={myfunc}>
          Check
        </button>
        <p ref={para}></p>
      </div>
      <h3 className="text-center m-3">Passbook details</h3>
      {storedata && (
        <table className="table table-striped table-bordered w-75 mx-auto">
          <thead className="table-dark">
            <tr>
              <th>Amount</th>
              <th>Date Of birth</th>
              <th>Sal Type</th>
              <th>Credited /debited</th>
            </tr>
          </thead>
          <tbody>
            {storedata.map((item, index) => (
              <tr key={item.id}>
                <td>{item.amount}</td>
                <td>{item['date-of-birth']}</td>
                <td>{item.salary}</td>
                <td>{item.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Content;
