// import React from "react"
import img1 from "../../assets/images/users/avatar-1.jpg";
import img2 from "../../assets/images/users/avatar-2.jpg";
import img3 from "../../assets/images/users/avatar-3.jpg";
import img4 from "../../assets/images/users/avatar-4.jpg";
import img5 from "../../assets/images/users/avatar-5.jpg";
import img6 from "../../assets/images/users/avatar-6.jpg";

// Chart-1
var series= [{
  data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
}];
var options={
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
  
},
colors: ['#f56e50'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};


// Chart-2
var series2= [{
  data: [50, 15, 35, 62, 23, 56, 44, 12, 36, 9, 54]
}];
var options2 = {
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
  
},
colors: ['#2cb57e'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};

// Chart-3
var series3= [{
  data: [25, 35, 35, 89, 63, 25, 44, 12, 36, 9, 54]
}];
var options3 ={
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
  
},
colors: ['#2cb57e'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};

// Chart-4
var series4= [{
  data: [50, 15, 35, 34, 23, 56, 65, 41, 36, 41, 32]
}];
var options4 ={
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
  
},
colors: ['#f56e50'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};

// Chart-5
var series5= [{
  data: [45, 53, 24, 89, 63, 60, 36, 50, 36, 32, 54]
}];
var options5 ={
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
},
colors: ['#f56e50'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};


// Chart-6
var series6= [{
  data: [50, 15, 35, 62, 23, 56, 44, 12, 36, 9, 54]
}];
var options6 = {
  chart: {
  type: 'line',
  width: 120,
  height: 30,
  sparkline: {
    enabled: true
  }
  
},
colors: ['#2cb57e'],
stroke: {
  curve: 'smooth',
  width: 3,
},
tooltip: {
  fixed: {
    enabled: false
  },
  x: {
    show: false
  },
  y: {
    title: {
      formatter: function (seriesName) {
        return ''
      }
    }
  },
  marker: {
    show: false
  }
}
};


const wallet = {
  id: "#SK0234",
  userName: "Henry Wells",
  email: "henrywells@abc.com",
  availableBalance: "$ 9148.23",
  lastMonthDifference: "+ $ 248.35",
  lastMonthDifferencePercent: "+ 1.3 %",
  send: "$ 654.42",
  receive: "$ 1054.32",
  withdraw: "$ 824.34",
  series: [
    {
      type: "area",
      name: "BTC",
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
    {
      type: "area",
      name: "ETH",
      data: [28, 41, 52, 42, 13, 18, 29, 18, 36, 51, 55, 35],
    },
    {
      type: "line",
      name: "LTC",
      data: [45, 52, 38, 24, 33, 65, 45, 75, 54, 18, 28, 10],
    },
  ],
  options: {
    chart: { toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2, dashArray: [0, 0, 3] },
    fill: { type: "solid", opacity: [0.15, 0.05, 1] },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#f1b44c", "#3452e1", "#50a5f1"],
  },
  walletHistory: [
    {
      id: "#SK3215",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3216",
      date: "04 Mar, 2020",
      type: "Sell",
      currency: "Ethereum",
      amount: "0.00413 ETH",
      amountinUSD: "$ 2123.01",
    },
    {
      id: "#SK3217",
      date: "04 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3218",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3219",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3220",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3221",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3222",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3223",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3224",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3225",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
    {
      id: "#SK3226",
      date: "03 Mar, 2020",
      type: "Buy",
      currency: "Bitcoin",
      amount: "1.00952 BTC",
      amountinUSD: "$ 9067.62",
    },
  ],
}

const cryptoOrders = [
  {
    date: "03 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "04 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "04 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "05 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "06 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "failed",
  },
  {
    date: "07 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "07 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "08 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "09 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "10 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "pending",
  },
  {
    date: "10 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "1.00952 BTC",
    valueinUSD: "$ 9067.62",
    status: "completed",
  },
  {
    date: "11 Mar, 2020",
    type: "Sell",
    coin: "Ethereum",
    value: "0.00413 ETH	",
    valueinUSD: "$ 2123.01",
    status: "completed",
  },
  {
    date: "12 Mar, 2020",
    type: "Buy",
    coin: "Bitcoin",
    value: "0.00321 BTC	",
    valueinUSD: "$ 1802.62",
    status: "pending",
  },
  {
    date: "13 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
  {
    date: "14 Mar, 2020",
    type: "Buy",
    coin: "Ethereum",
    value: "Ethereum",
    valueinUSD: "$ 9423.73",
    status: "failed",
  },
  {
    date: "15 Mar, 2020",
    type: "Buy",
    coin: "Litecoin",
    value: "0.00224 LTC",
    valueinUSD: "$ 1773.01",
    status: "completed",
  },
]

const cryptoSlider =[
  {
    id:1,
    name:"Kenneth",
    tag :"@Kenneth",
    image : img1
  },
  {
    id:2,
    name :"Frances",
    tag:"@Frances",
    image : img2
  },
  {
    id:3,
    name :"Kristen",
    tag:"@Kristen",
    image : img3
  },{
    id:4,
    name :"Margaret",
    tag:"@Margaret",
    image : img4
  },{
    id:5,
    name :"Christine",
    tag:"@Christine",
    image : img5
  },{
    id:6,
    name :"Bridgett",
    tag:"@Bridgett",
    image : img6
  },
]


const recentFills = [
  {
      id:1,
      icon1:"mdi mdi-ethereum",
      icon1Color :"primary",
      icon2 :"mdi mdi-bitcoin",
      icon2Color :"warning",
      range1 :"0.685 WETH",
      range2:"250 USDT",
      timeAgo :"6",
      value: "$14,965.15"
  },
  {
      id:2,
      icon1:"mdi mdi-judaism",
      icon1Color :"success",
      icon2 :"mdi mdi-litecoin",
      icon2Color :"info",
      range1 :"526.54 DAI",
      range2:"250 LTC",
      timeAgo :"30",
      value: "$68,452.40"
  },
  {
      id:3,
      icon1:"mdi mdi-shape-polygon-plus",
      icon1Color :"danger",
      icon2 :"mdi mdi-bitcoin",
      icon2Color :"warning",
      range1 :"0.852 MATIC",
      range2:"6541 USDT",
      timeAgo :"45",
      value: "$65,621.40"
  },
  {
      id:4,
      icon1:"mdi mdi-ethereum",
      icon1Color :"success",
      icon2 :"mdi mdi-bitcoin",
      icon2Color :"primary",
      range1 :"0.545 WETH",
      range2:"562 USDT",
      timeAgo :"46",
      value: "$86,512.60"
  },
  {
      id:5,
      icon1:"mdi mdi-litecoin",
      icon1Color :"primary",
      icon2 :"mdi mdi-shape-polygon-plus",
      icon2Color :"danger",
      range1 :"0.685 MATIC",
      range2:"250 LTC",
      timeAgo :"52",
      value: "$56,845.70"
  },
  {
      id:6,
      icon1:"mdi mdi-ethereum",
      icon1Color :"primary",
      icon2 :"mdi mdi-bitcoin",
      icon2Color :"warning",
      range1 :"0.685 WETH",
      range2:"250 DAI",
      timeAgo :"60",
      value: "$45,854.17"
  }
]

const cryptoCurrencyPrices =[
  {
    id:1,
    coinIcon:"mdi mdi-bitcoin",
    coin :"Bitcoin",
    coinColor:"warning",
    symbol :"BTC",
    price :"$52,635.254526",
    time1h : "-0.4%",
    time1hColor :"danger",
    time24h: "-0.7%",
    time24hColor :"danger",
    MktCap:"$82,632.4527",
    chartsColor: '#f56e50',
    series: series,
    option:options
  },
  {
    id:2,
    coinIcon:"mdi mdi-ethereum",
    coin :"Ethereum",
    coinColor:"muted",
    symbol :"ETH",
    price :"$41,718.094526",
    time1h : "-0.4%",
    time1hColor :"danger",
    time24h: "6.6%",
    time24hColor :"success",
    MktCap:"$56,017.3118",
    chartsColor: '#2cb57e',
    series: series2,
    option:options2
  },
  {
    id:3,
    coinIcon:"mdi mdi-litecoin",
    coin :"Litecoin ",
    coinColor:"primary",
    symbol :"ETH",
    price :"$52,635.255842",
    time1h : "-0.1%",
    time1hColor :"success",
    time24h: "-0.5%",
    time24hColor :"success",
    MktCap:"$45,634.5651",
    chartsColor: '#2cb57e',
    series: series3,
    option:options3
  },
  {
    id:4,
    coinIcon:"mdi mdi-shape-polygon-plus",
    coin :"Polygon",
    coinColor:"warning",
    symbol :"MATIC",
    price :"$15,905.658954",
    time1h : "0.4%",
    time1hColor :"success",
    time24h: "-0.7%",
    time24hColor :"success",
    MktCap:"$12,954.3323",
    chartsColor: '#f56e50',
    series: series4,
    option:options4
  },
  {
    id:5,
    coinIcon:"mdi mdi-judaism",
    coin :"Dai",
    coinColor:"primary",
    symbol :"Dai",
    price :"$32,997.608548",
    time1h : "-0.4%",
    time1hColor :"danger",
    time24h: "0.0%",
    time24hColor :"muted",
    MktCap:"$58,848.0381",
    chartsColor: '#f56e50',
    series: series5,
    option:options5
  },
  {
    id:6,
    coinIcon:"mdi mdi-chart-line-stacked",
    coin :"The Graph",
    coinColor:"muted",
    symbol :"GRT",
    price :"$45,957.746452",
    time1h : "0.4%",
    time1hColor :"success",
    time24h: "-0.7%",
    time24hColor :"success",
    MktCap:"$12,954.3323",
    chartsColor: '#2cb57e',
    series: series6,
    option:options6
  },
]

export { wallet, cryptoOrders ,cryptoSlider ,recentFills,cryptoCurrencyPrices}
