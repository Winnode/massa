<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallet Information</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    #form-container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      width: 500px;
      text-align: center;
    }

    h1 {
      color: #4caf50;
    }

    label {
      display: block;
      margin: 15px 0 10px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    button {
      background-color: #4caf50;
      color: white;
      padding: 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      font-size: 18px;
    }

    #result {
      margin-top: 30px;
      color: #333;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div id="form-container">
    <h1>Check Massa Wallet Bangpateng Group</h1>
    <form id="walletForm">
      <label for="walletAddresses">Wallet Addresses (comma-separated):</label>
      <input type="text" id="walletAddresses" name="walletAddresses" required>
      <button type="submit">Check Wallets</button>
    </form>
    <div id="result"></div>
  </div>

  <script>
    document.getElementById('walletForm').addEventListener('submit', function(event) {
      event.preventDefault();
      checkWallet();
    });

    async function checkWallet() {
      const walletAddresses = document.getElementById('walletAddresses').value.split(',');

      try {
        const response = await fetch('/check-wallets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddresses }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('result').innerText = result.message;
      } catch (error) {
        console.error('Error during fetch:', error);
        document.getElementById('result').innerText = 'An error occurred during the request.';
      }
    }
  </script>
</body>
</html>
