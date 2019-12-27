## Edgar

`GET https://www.sec.gov/files/company_tickers.json`
```json
{
  ...
  "10024": {
    "cik_str": 1326801,
    "ticker": "FB",
    "title": "Facebook Inc"
  },
  ...
}
```

`GET https://www.sec.gov/Archives/edgar/data/1326801/index.json`
```json
{
  "directory": {
    "name": "/Archives/edgar/data/1326801",
    "parent-dir": "",
    "item": [
      {
        "last-modified": "2019-11-22 19:51:07",
        "name": "000112760219033617",
        "type": "folder.gif",
        "size": ""
      },
    ],
  }
}
```

| Name | Description      |
| ---- | ---------------- |
| 10-K | Annual report    |
| 10-Q | Quarterly report |



## Resources

- https://www.xbrl.org/
- https://www.sec.gov/edgar/searchedgar/accessing-edgar-data.htm
- https://www.nasdaq.com/market-activity/stocks/screener
- https://www.slickcharts.com/sp500