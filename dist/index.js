"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = 3000;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express["static"]('public'));

// Baca data dari dashboard_data.json
var jsonData;
try {
  jsonData = fs.readFileSync('dashboard_data.json', 'utf-8');
} catch (error) {
  console.error("Error reading dashboard_data.json: ".concat(error.message));
  process.exit(1);
}
var dashboardData;
try {
  dashboardData = JSON.parse(jsonData);
} catch (error) {
  console.error("Error parsing dashboard_data.json: ".concat(error.message));
  process.exit(1);
}

// Fungsi untuk mencari informasi wallet berdasarkan alamat
function findWalletInfo(walletAddress) {
  return dashboardData[walletAddress] || null;
}

// Handle permintaan dari formulir di frontend untuk banyak wallet
app.post('/check-wallets', function (req, res) {
  var walletAddresses = req.body.walletAddresses;
  try {
    var results = walletAddresses.map(function (walletAddress) {
      var walletInfo = findWalletInfo(walletAddress);
      if (walletInfo) {
        var nodeRunningCoins = parseFloat(walletInfo.node_running_coins) || 0;
        var ambassadorCoins = parseFloat(walletInfo.ambassador_coins) || 0;
        var questCoins = parseFloat(walletInfo.quest_coins) || 0;
        var totalCoins = nodeRunningCoins + ambassadorCoins + questCoins;
        return "Total Coins for ".concat(walletAddress, ": ").concat(totalCoins, " coins");
      } else {
        return "No information found for wallet address: ".concat(walletAddress);
      }
    });
    res.status(200).json({
      message: results.join('\n')
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing wallets: ".concat(error.message)
    });
  }
});

// Menangani rute untuk halaman utama
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.listen(port, function () {
  console.log("Server is running at http://localhost:".concat(port));
});