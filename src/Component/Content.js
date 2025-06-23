import React, { useRef } from 'react';

function Content() {
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const para = useRef();
  const radioCredit = useRef();
  const radioDebit = useRef();

  console.log(localStorage.getItem('product'));
  console.log(JSON.parse(localStorage.getItem('product')));

  let setdata = JSON.parse(localStorage.getItem('product')) || [];

  function myfunc() {
    const x1 = text1.current.value;
    const x2 = text2.current.value;
    const x3 = text3.current.value;

    let errMsg = '';
    if (x1 === '' || x2 === '' || x3 === '') {
      errMsg = 'All values are required';
      para.current.className = 'alert alert-danger';
    } else if (isNaN(x1)) {
      errMsg = 'Amount must be a number';
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
      errMsg = '✅ All values are correct and saved successfully!';
      para.current.className = 'alert alert-success mt-3';
    }

    para.current.innerText = errMsg;
  }

  const storedata = [...setdata];

  return (
    <div className="container my-4">
      <h1 className="text-center text-primary mb-4">💰 Expense Calculator</h1>

      <div className="card shadow-sm rounded mb-5">
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Amount</label>
                <input
                  type="text"
                  ref={text1}
                  className="form-control"
                  placeholder="Enter amount"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input type="date" ref={text2} className="form-control" />
              </div>

              <div className="col-md-12">
                <label className="form-label">Details</label>
                <input
                  type="text"
                  ref={text3}
                  className="form-control"
                  placeholder="Salary details"
                />
              </div>
            </div>

            <div className="mt-4">
              <h5>Select Payment Mode</h5>
              <div className="form-check form-check-inline">
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

              <div className="form-check form-check-inline">
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
            </div>

            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={myfunc}
              >
                Submit
              </button>
            </div>

            <p ref={para} className="text-center mt-3"></p>
          </form>
        </div>
      </div>

      <h3 className="text-center text-success mb-3">📄 Passbook Details</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Id</th>
              <th>Amount</th>
              <th>Date of Birth</th>
              <th>Details</th>
              <th>Credit/Debit</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {(() => {
              let runningTotal = 0;
              return storedata.map((item) => {
                const amount = Math.abs(parseFloat(item.amount));

                if (item.paymentMode === 'Credit') {
                  runningTotal += amount;
                } else if (item.paymentMode === 'Debit') {
                  runningTotal -= amount;
                }

                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.amount}</td>
                    <td>{item['date-of-birth']}</td>
                    <td>{item.salary}</td>
                    <td
                      className={
                        item.paymentMode === 'Credit'
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {item.paymentMode}
                    </td>
                    <td>{runningTotal.toFixed(2)}</td>
                  </tr>
                );
              });
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Content;
