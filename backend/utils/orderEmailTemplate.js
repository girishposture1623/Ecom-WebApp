const orderEmailTemplate = ({ name, orderId, amount }) => {
  return `
  <!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8" />
      <title>Order Confirmation</title>
  </head>

  <body style="font-family:Arial;background:#f4f4f4;padding:30px;">

      <div style="
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:10px;
      overflow:hidden;
      ">

          <div style="
          background:#ff6b00;
          color:white;
          padding:20px;
          text-align:center;
          ">

              <h1>🛒 Shoplix</h1>

          </div>

          <div style="padding:30px;">

              <h2>🎉 Order Confirmed</h2>

              <p>Hello <b>${name}</b>,</p>

              <p>
                  Thank you for shopping with Shoplix.
              </p>

              <p>Your order has been placed successfully.</p>

              <table
              style="
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
              ">

                  <tr>

                      <td
                      style="
                      padding:10px;
                      border:1px solid #ddd;
                      ">
                      Order ID
                      </td>

                      <td
                      style="
                      padding:10px;
                      border:1px solid #ddd;
                      ">
                      ${orderId}
                      </td>

                  </tr>

                  <tr>

                      <td
                      style="
                      padding:10px;
                      border:1px solid #ddd;
                      ">
                      Amount
                      </td>

                      <td
                      style="
                      padding:10px;
                      border:1px solid #ddd;
                      ">
                      ₹${amount}
                      </td>

                  </tr>

              </table>

              <br>

              <p>
                  We are preparing your order.
              </p>

              <p>
                  You'll receive another email once it has been shipped.
              </p>

              <br>

              <a
                  href="http://localhost:3000/myorders"
                  style="
                  background:#ff6b00;
                  color:white;
                  padding:12px 20px;
                  text-decoration:none;
                  border-radius:5px;
                  display:inline-block;
                  "
              >
                  View Orders
              </a>

              <br><br>

              <p>Thank you ❤️</p>

              <h3>Shoplix Team</h3>

          </div>

      </div>

  </body>

  </html>
  `;
};

export default orderEmailTemplate;