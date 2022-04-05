# Orderbook
## 1. Build an Orderbook using React / React Native / Vanilla JS. Read more about Orderbook here :  https://www.investopedia.com/terms/o/order-book.asp

## 2. Build a client socket that connects to wss://production-esocket.delta.exchange 

## 3. Subscribe to the orderbook channel (l2_orderbook) for BTCUSDT , BTCUSD, ETHUSDT , DOGEUSDT , SOLUSDT. 

### a.
Subscribe for 1 product at a time . Build a dropdown on top of the orderbook which can switch between the above products.

### b.
Selecting a new product from the dropdown should unsubscribe the old product order book and subscribe to the new product orderbook.

### c.
Sample subscription payload : 
```
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l2_orderbook",
                "symbols": [
                    "DETO_USDT"
                ]
            }
        ]
    }
}
```
### d.
For more information refer to this link:     https://docs.delta.exchange/#l2_orderbook