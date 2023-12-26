async function checkWallet() {
  const walletAddresses = document.getElementById('walletAddresses').value.split(',');

  try {
    const response = await fetch('/check-wallets', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ walletAddresses }),
		})

    const result = await response.json();

    document.getElementById('result').innerText = result.message;
  } catch (error) {
    console.error(`Error checking wallets: ${error.message}`);
    document.getElementById('result').innerText = 'An error occurred while checking wallets.';
  }
}

// You can add more client-side JavaScript logic as needed
